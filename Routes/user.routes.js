const express = require('express');
const { authenticationToken } = require('../middleware/auth');
const { login } = require('../Controllers/user.controller');
const router = express.Router();

router.post('/login', login);

module.exports = router;