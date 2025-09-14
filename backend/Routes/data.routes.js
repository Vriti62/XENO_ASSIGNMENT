const express = require('express');
const { getTotalCustomers, getOrdersByDate, getTopCustomers } = require('../Controllers/data.controller');
const { authenticationToken } = require('../middleware/auth');
const router = express.Router();


router.get("/customers-count",authenticationToken, getTotalCustomers);
router.get("/orders-by-date",authenticationToken, getOrdersByDate);
router.get("/top-customers",authenticationToken, getTopCustomers);

module.exports = router;
