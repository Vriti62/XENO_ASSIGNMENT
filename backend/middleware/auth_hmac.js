const crypto = require("crypto");
const prisma = require("../db/db.config");

exports.verifyShopifyWebhook= async (req, res, next) =>{
  try {
    const shop = req.headers["x-shopify-shop-domain"];
    const hmac = req.headers["x-shopify-hmac-sha256"];
    const rawBody = req.rawBody; // 

    if (!shop || !hmac) {
      return res.status(400).json({ msg: "Missing headers" });
    }

    const store = await prisma.store.findUnique({
      where: { store_name: shop },
    });

    if (!store) {
      return res.status(404).json({ msg: "Store not found" });
    }


    const secret = store.webhook_secret;

    const digest = crypto
      .createHmac("sha256", secret)
      .update(rawBody, "utf8")
      .digest("base64");

    if (digest !== hmac) {
      return res.status(401).json({ msg: "Webhook verification failed" });
    }

    console.log(`Webhook verified for ${shop}`);
    next();
  } catch (err) {
    console.error("Webhook verification error:", err);
    res.status(500).json({ msg: "Internal error verifying webhook" });
  }
}


