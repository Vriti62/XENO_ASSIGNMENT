const express = require('express');
const { webhookData } = require('../Controllers/webhook.controller');
const router = express.Router();

router.post("/webhook", webhookData);

module.exports = router;