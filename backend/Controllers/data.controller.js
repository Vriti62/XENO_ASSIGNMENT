const prisma = require('../db/db.config');

//totalCustomers
exports.getTotalCustomers = async (req, res) => {
  try {
    const { store } = req.query; 
    const total = await prisma.customer.count();
    res.status(200).json({ total_customers: total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

//orderByDates
exports.getOrdersByDate = async (req, res) => {
  try {
    const { startDate, endDate, store } = req.query;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); //  full day

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ msg: "Invalid date format" });
    }

    if (!store) return res.status(400).json({ msg: "Store is required" });

    const orders = await prisma.order.findMany({
      where: {
        store_id: store,
        created_at: {
          gte: start,
          lte: end,
        },
      },
      select: {
        id: true,
        order_number: true,
        order_price: true,
        created_at: true,
      },
      orderBy: { created_at: 'asc' }
    });

    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

//top 5 customers by spend
exports.getTopCustomers = async (req, res) => {
  try {
    const { store } = req.query;
    const topCustomers = await prisma.customer.findMany({
      where: {
        order: { some: { store_id: store } }
      },
      select: {
        id: true,
        cust_name: true,
        cust_email: true,
        order: {
          where: { store_id: store },
          select: { order_price: true }
        }
      }
    });

//total spent per customer
const customersWithTotal = topCustomers.map(cust => {
    const totalSpent = cust.order.reduce((sum, o) => sum + Number(o.order_price), 0);
        return { id: cust.id, name: cust.cust_name, email: cust.cust_email, totalSpent };
    });

        customersWithTotal.sort((a, b) => b.totalSpent - a.totalSpent);
        res.status(200).json({ topCustomers: customersWithTotal.slice(0, 5) });

    } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};
