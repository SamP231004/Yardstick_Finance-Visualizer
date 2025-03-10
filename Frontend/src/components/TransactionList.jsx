import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch transactions. Please try again later.');
      setLoading(false);
      console.error('Error fetching transactions:', err);
    }
  };

  const deleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await axios.delete(`http://localhost:5000/api/transactions/${id}`);
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
    <div className="card">
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
                    ${Math.abs(transaction.amount).toFixed(2)}
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