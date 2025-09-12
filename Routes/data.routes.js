const express = require('express');
const { getTotalCustomers, getOrdersByDate, getTopCustomers } = require('../Controllers/data.controller');
const router = express.Router();


router.get("/customers-count", getTotalCustomers);
router.get("/orders-by-date", getOrdersByDate);
router.get("/top-customers", getTopCustomers);

module.exports = router;
