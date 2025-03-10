const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: false,
        default: 'Uncategorized'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);