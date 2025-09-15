const crypto = require("crypto");
const prisma = require("../db/db.config");

exports.verifyShopifyWebhook = async (req, res, next) => {
  try {
    const hmacHeader = req.get("X-Shopify-Hmac-Sha256");
    const body = req.rawBody;
    const storeDomain = req.headers["x-shopify-shop-domain"];

    const store = await prisma.store.findUnique({
      where: { store_name: storeDomain }
    });

    if (!store || !store.webhook_secret) {
      console.log("Unknown store:", storeDomain);
      return res.status(401).json({ msg: "Unauthorized store" });
    }

    const digest = crypto
      .createHmac("sha256", store.webhook_secret)
      .update(body, "utf8")
      .digest("base64");

    if (digest !== hmacHeader) {
      console.log("Invalid HMAC for:", storeDomain);
      return res.status(401).json({ msg: "Unauthorized - Invalid HMAC" });
    }

    console.log("Authenticated webhook for:", storeDomain);
    next();
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return res.status(400).json({ msg: "Webhook verification failed" });
  }
};
