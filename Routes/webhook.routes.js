const express = require('express');
const { webhookData } = require('../Controllers/webhook.controller');
const {verifyShopifyWebhook} = require('../middleware/auth_hmac')
const router = express.Router();

router.post("/webhook", verifyShopifyWebhook, webhookData);

module.exports = router;