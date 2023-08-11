const express = require('express');
const router = express.Router();

const { transactionViews } =  require('../controller/transactionController');

router.get('/reports', transactionViews)

module.exports = router