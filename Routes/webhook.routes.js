const express = require('express');
const { webhookData } = require('../Controllers/webhook.controller');
const router = express.Router();

router.post("/api/webhook", webhookData);

module.exports = router;