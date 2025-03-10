const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

// Get all budgets
router.get('/', async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.json(budgets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new budget
router.post('/', async (req, res) => {
    const budget = new Budget({
        category: req.body.category,
        amount: req.body.amount,
        month: req.body.month,
        year: req.body.year
    });

    try {
        const newBudget = await budget.save();
        res.status(201).json(newBudget);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update budget
router.put('/:id', async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget) return res.status(404).json({ message: 'Budget not found' });

        budget.category = req.body.category || budget.category;
        budget.amount = req.body.amount || budget.amount;
        budget.month = req.body.month || budget.month;
        budget.year = req.body.year || budget.year;

        const updatedBudget = await budget.save();
        res.json(updatedBudget);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete budget
router.delete('/:id', async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget) return res.status(404).json({ message: 'Budget not found' });

        await budget.deleteOne();
        res.json({ message: 'Budget deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get budget vs actual
router.get('/comparison', async (req, res) => {
    try {
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ message: 'Month and year are required' });
        }

        const budgets = await Budget.find({ month, year });

        // Get start and end date of the month
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        // Get transactions for the month grouped by category
        const transactions = await Transaction.aggregate([
            {
                $match: {
                    date: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: "$category",
                    actualAmount: { $sum: "$amount" }
                }
            }
        ]);

        // Combine budget and actual data
        const comparison = budgets.map(budget => {
            const actual = transactions.find(t => t._id === budget.category);
            return {
                category: budget.category,
                budgetAmount: budget.amount,
                actualAmount: actual ? actual.actualAmount : 0,
                difference: actual ? budget.amount - actual.actualAmount : budget.amount
            };
        });

        res.json(comparison);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;