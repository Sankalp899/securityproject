const express = require('express');
const { registerControllers } = require('../controllers/RegsiterController');
const registerRoute = express.Router();


registerRoute.post('/register',registerControllers)

module.exports = {registerRoute}