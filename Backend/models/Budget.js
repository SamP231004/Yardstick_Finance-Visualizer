const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Budget', BudgetSchema);