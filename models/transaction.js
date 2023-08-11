const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionLogSchema =  new Schema({

    transaction: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    }

})


module.exports = mongoose.model('Transaction', transactionLogSchema);