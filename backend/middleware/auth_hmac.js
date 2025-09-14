const crypto = require("crypto");

exports.verifyShopifyWebhook=(req, res, next) => {
  try {
    const hmacHeader = req.get("X-Shopify-Hmac-Sha256");
    const body = req.rawBody; 
    const secret = process.env.SHOPIFY_API_SECRET;

    const digest = crypto
      .createHmac("sha256", secret)
      .update(body, "utf8")
      .digest("base64");

    if (digest !== hmacHeader) {
      console.log("not authorized")
      return res.status(401).json({ msg: "Unauthorized - Invalid HMAC" });
    }
    console.log("auth dine")
    next(); 
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return res.status(400).json({ msg: "Webhook verification failed" });
  }
}

