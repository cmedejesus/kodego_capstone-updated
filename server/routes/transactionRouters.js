const express = require('express');
const router = express.Router();
const {isLoggedIn, isAccessible} = require('../../middlewares');

const { transactionViews } =  require('../controller/transactionController');

router.get('/reports', isLoggedIn, isAccessible, transactionViews)

module.exports = router