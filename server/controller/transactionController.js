const mongoose =require('mongoose');
const catchAsync = require('../../utils/catchAsync');
// Models
const Transaction = require('../../models/transaction')

const activePage = '/reports'

exports.transactionViews = async (req,res)=>{
    const transactions = await Transaction.find({});

    res.render('pages/transactions',{transactions, activePage})
}