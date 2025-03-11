console.log("This is the correct server.js file!");

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactions = require('./routes/transactions');
const budgets = require('./routes/budgets');
const Transaction = require('./models/Transaction');
console.log("Transaction Model:", Transaction);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/budgets', budgets);

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.error('MongoDB connection error stringified:', err.toString());
        console.error('MongoDB connection error stack:', err.stack);
    });

// Monthly Summary Route (Corrected)
app.get('/api/transactions/summary/monthly', async (req, res) => {
    console.log("Monthly summary route hit!");
    try {
        const transactions = await Transaction.find();
        // console.log("Fetched Transactions:", JSON.stringify(transactions, null, 2));
        const monthlySummary = {};

        transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const monthYearKey = `${year}-${month}`;

            if (!monthlySummary[monthYearKey]) {
                monthlySummary[monthYearKey] = {
                    _id: { month, year },
                    income: 0,
                    expenses: 0,
                    count: 0
                };
            }

            if (transaction.amount >= 0) {
                monthlySummary[monthYearKey].income += transaction.amount;
            } else {
                monthlySummary[monthYearKey].expenses += Math.abs(transaction.amount);
            }

            monthlySummary[monthYearKey].count++;
        });

        const result = Object.values(monthlySummary).sort((a, b) => {
            if (a._id.year !== b._id.year) {
                return a._id.year - b._id.year;
            }
            return a._id.month - b._id.month;
        });

        res.json(result);
    } catch (error) {
        console.error("Error fetching monthly summary:", error);
        res.status(500).json({ error: "Failed to fetch monthly summary" });
    }
});

app.use('/api/transactions', transactions);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});