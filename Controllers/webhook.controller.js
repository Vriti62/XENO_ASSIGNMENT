const prisma = require('../db/db.config');
const redis = require('../utils/redis'); 

exports.webhookData = async (req, res) => {
  try {
    const store = req.headers['x-shopify-shop-domain'];
    const event = req.headers['x-shopify-topic'];
    const data = req.body;

    const redisKey = `shopify_event:${event}:${data.id}`;

    const alreadyProcessed = await redis.get(redisKey);
    if (alreadyProcessed) {
      return res.status(200).json({ msg: "Duplicate event ignored" });
    }

    await redis.set(redisKey, "1", "EX", 3600);


    let storeData = await prisma.store.upsert({
      where: { store_name: store },
      update: {},
      create: { store_name: store }
    });

    switch(event) {
      case "customers/create":
        const customer = await saveCustomersToDB(data);
        return res.status(201).json({
          data: customer,
          msg: "Customer created successfully!"
        });

      case "products/create":
        const product = await saveProductToDB(data, storeData);
        return res.status(201).json({
          data: product,
          msg: "Product created successfully!"
        });

      case "products/update":
        const updatedProduct = await saveupdatedProdToDB(data,storeData);
        return res.status(201).json({
          data:updatedProduct,
          msg:"product updated successfully!"
        })
      case "orders/create":
        const order = await saveOrdersToDB(data, storeData);
        return res.status(201).json({
          data: order,
          msg: "Order created successfully!"
        });
      case "orders/delete":
        const deletedOrder = await removeDeletedInDB(data,storeData);
        return res.status(200).json({
          data:deletedOrder,
          msg:"Order deleted successfully!"
        })
      case "inventory_items/create":
        const inventory_items =  await saveInventoryItemToDB(data,storeData);
        return res.status(201).json({
          data:inventory_items,
          msg:"inventory_items created successfully!"
        })

      default:
        return res.status(400).json({ msg: "Unhandled Shopify event" });
    }
  } catch(err) {
    console.log(err);
    if (err.code === 'P2002') {
      return res.status(409).json({ msg: "Duplicate entry" });
    }
    return res.status(400).json({ msg: err.message });
  }
}



async function saveCustomersToDB(data) {
 const newCustomer = await prisma.customer.upsert({
    where: { id: data.id.toString() },
    update: {
      cust_name: `${data.first_name} ${data.last_name}`,
      cust_email: data.email
  },
    create: {
      id: data.id.toString(),
      cust_name: `${data.first_name} ${data.last_name}`,
      cust_email: data.email,
      cust_password: "",
      created_at: data.published_at ? new Date(data.published_at) : new Date()
    }
});

}

async function saveProductToDB(data, storeData) {
  const newProduct = await prisma.product.create({
    data: {
      id: data.id.toString(),
      prod_name: data.title,
      prod_type: data.product_type,
      prod_price: Number(data.variants[0].price),
      prod_tags: data.tags,
      store_id: storeData.id,
      created_at: data.published_at ? new Date(data.published_at) : new Date()
    }
  });
  return newProduct;
}

async function saveOrdersToDB(data, storeData) {

  const newOrder = await prisma.order.create({
    data: {
      id: data.id.toString(),
      cust_id: data.customer.id.toString(),
      order_number: data.order_number,
      order_name: data.line_items[0].name,
      order_price: data.subtotal_price,
      store_id: storeData.id,
      orderItem: {
        create: data.line_items.map(item => ({
          prod_id: item.product_id.toString(),
          quantity: item.quantity,
          created_at: data.published_at ? new Date(data.published_at) : new Date()
        }))
      },
      created_at: data.published_at ? new Date(data.published_at) : new Date()
    }
  });

  return newOrder;
}

async function saveupdatedProdToDB(data,storeData){
  const updatedProduct  = await prisma.product.update({
    where:{
      id:data.id.toString()
    },
    data:{
      id: data.id.toString(),
      prod_name: data.title,
      prod_type: data.product_type,
      prod_price: Number(data.variants[0].price),
      prod_tags: data.tags,
      store_id: storeData.id
    },

  })

  return updatedProduct;
}

async function removeDeletedInDB(data,storeData){
  const deletedOrder = await prisma.order.delete({
    where:{
      id: data.id.toString()
    }
  })
}

async function saveInventoryItemToDB(data) {
  return await prisma.inventoryItem.create({
    data: {
      id: data.id.toString(),
      sku: data.sku,
      tracked: data.tracked,
      weight_value: data.weight_value,
      weight_unit: data.weight_unit
    }
  });
}





