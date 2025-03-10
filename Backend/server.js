require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactions = require('./routes/transactions');
const budgets = require('./routes/budgets');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', transactions);
app.use('/api/budgets', budgets);

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('MongoDB connection error stringified:', err.toString());
    console.error('MongoDB connection error stack:', err.stack);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});