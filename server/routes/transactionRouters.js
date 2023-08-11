const express = require('express');
const router = express.Router();

const { transactionViews } =  require('../controller/transactionController');
const {isLoggedIn, isAccessible, isAuthorizedBy} = require('../../middlewares');

router.get('/reports', isLoggedIn, isAuthorizedBy, transactionViews)

module.exports = router
