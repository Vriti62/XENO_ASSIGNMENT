const express = require('express');
const { webhookData } = require('../Controllers/webhook.controller');
const {verifyShopifyWebhook} = require('../middleware/auth_hmac');
const { onboardStore } = require('../Controllers/store.controller');
const router = express.Router();

router.post("/webhook", verifyShopifyWebhook, webhookData);
router.post("/store", onboardStore)

module.exports = router;