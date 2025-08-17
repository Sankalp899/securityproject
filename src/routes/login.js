const express = require('express');
const { loginControllers } = require('../controllers/LoginController.js');
const loginRoute = express.Router();

loginRoute.post('/login',loginControllers);

module.exports = { loginRoute }