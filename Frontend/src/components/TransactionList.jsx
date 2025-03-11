import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      if (!baseURL) {
        throw new Error("VITE_REACT_APP_API_BASE_URL is not defined in .env");
      }
      const apiUrl = `${baseURL}/api/transactions`;
      console.log("Fetching from:", apiUrl);
      const response = await axios.get(apiUrl);
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'An unexpected error occurred.');
      setLoading(false);
      console.error('Error fetching transactions:', error);
    }
  };

  const deleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await axios.delete(`${baseURL}/api/transactions/${id}`);
        fetchTransactions();
      } catch (err) {
        setError('Failed to delete transaction. Please try again later.');
        console.error('Error deleting transaction:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="Transactioncard">
      <div className="card-title">
        <h2>Transactions</h2>
        <Link to="/transactions/add" className="btn">Add Transaction</Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <p>No transactions yet. Add your first transaction to get started!</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction._id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td className={transaction.amount < 0 ? 'text-danger' : 'text-success'}>
                    Rs {Math.abs(transaction.amount).toFixed(2)}
                  </td>
                  <td className="actions">
                    <Link to={`/transactions/edit/${transaction._id}`} className="btn btn-secondary">Edit</Link>
                    <button
                      onClick={() => deleteTransaction(transaction._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;