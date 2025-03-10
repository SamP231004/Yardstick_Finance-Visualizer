const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // Import express-validator
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new transaction
router.post('/',
    // Validation middleware
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('description').notEmpty().withMessage('Description is required'),

    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const transaction = new Transaction({
            amount: req.body.amount,
            description: req.body.description,
            date: req.body.date,
            category: req.body.category
        });

        try {
            const newTransaction = await transaction.save();
            res.status(201).json(newTransaction);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
);

// Get single transaction
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update transaction
router.put('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        transaction.amount = req.body.amount || transaction.amount;
        transaction.description = req.body.description || transaction.description;
        transaction.date = req.body.date || transaction.date;
        transaction.category = req.body.category || transaction.category;

        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        await transaction.deleteOne();
        res.json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get monthly summary
router.get('/summary/monthly', async (req, res) => {
    try {
        const result = await Transaction.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" }
                    },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get category summary
router.get('/summary/category', async (req, res) => {
    try {
        const result = await Transaction.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { totalAmount: -1 } }
        ]);

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;