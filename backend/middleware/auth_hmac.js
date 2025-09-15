const crypto = require("crypto");

const STORE_SECRETS = {
  "24seventy.myshopify.com": process.env.WEBHOOK_SECRET_STORE2,
  "xeno-assign.myshopify.com": process.env.WEBHOOK_SECRET_STORE1,
};


exports.verifyShopifyWebhook=(req, res, next) => {
  try {
    const hmacHeader = req.get("X-Shopify-Hmac-Sha256");
    const body = req.rawBody; 
    
    const store = req.headers["x-shopify-shop-domain"];

    const secret = STORE_SECRETS[store];
        
    console.log("Incoming store:", store);
    console.log("Resolved secret:", secret);
    if (!secret) {
      console.log("Unknown store: ", store);
      return res.status(401).json({ msg: "Unauthorized store" });
    }

    const digest = crypto
      .createHmac("sha256", secret)
      .update(body, "utf8")
      .digest("base64");

    if (digest !== hmacHeader) {
      console.log("not authorized")
      return res.status(401).json({ msg: "Unauthorized - Invalid HMAC" });
    }
    console.log("auth done")
    next(); 
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return res.status(400).json({ msg: "Webhook verification failed" });
  }
}

