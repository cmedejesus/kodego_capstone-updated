const express = require('express');
const router = express.Router();
const { viewDashboard, test } = require('../controller/dashboardController');
const {isLoggedIn} = require('../../middlewares');

router.get('/', isLoggedIn, viewDashboard);


module.exports = router;