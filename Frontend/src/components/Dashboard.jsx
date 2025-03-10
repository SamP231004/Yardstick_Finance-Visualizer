import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MonthlyChart from './MonthlyChart';
import CategoryChart from './CategoryChart';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    totalIncome: 0,
    balance: 0,
    recentTransactions: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/transactions');
        setTransactions(response.data);
        
        // Calculate summary
        const totalExpenses = response.data
          .filter(t => t.amount < 0)
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);
          
        const totalIncome = response.data
          .filter(t => t.amount > 0)
          .reduce((sum, t) => sum + t.amount, 0);
          
        const balance = totalIncome - totalExpenses;
        
        // Get 5 most recent transactions
        const recentTransactions = [...response.data]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        
        setSummary({
          totalExpenses,
          totalIncome,
          balance,
          recentTransactions
        });
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data. Please try again later.');
        setLoading(false);
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      
      <div className="dashboard">
        <div className="card summary-card">
          <div className="card-title">
            <h2>Balance</h2>
          </div>
          <div className="summary-value">${summary.balance.toFixed(2)}</div>
          <p>Current balance across all accounts</p>
        </div>
        
        <div className="card summary-card">
          <div className="card-title">
            <h2>Income</h2>
          </div>
          <div className="summary-value">${summary.totalIncome.toFixed(2)}</div>
          <p>Total income received</p>
        </div>
        
        <div className="card summary-card">
          <div className="card-title">
            <h2>Expenses</h2>
          </div>
          <div className="summary-value">${summary.totalExpenses.toFixed(2)}</div>
          <p>Total expenses paid</p>
        </div>
      </div>
      
      <div className="card">
        <div className="card-title">
          <h2>Monthly Overview</h2>
        </div>
        <div className="chart-container">
          <MonthlyChart transactions={transactions} />
        </div>
      </div>
      
      <div className="card">
        <div className="card-title">
          <h2>Spending by Category</h2>
        </div>
        <div className="chart-container">
          <CategoryChart transactions={transactions} />
        </div>
      </div>
      
      <div className="card">
        <div className="card-title">
          <h2>Recent Transactions</h2>
          <Link to="/transactions" className="btn btn-secondary">View All</Link>
        </div>
        
        {summary.recentTransactions.length === 0 ? (
          <div className="empty-state">
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
                </tr>
              </thead>
              <tbody>
                {summary.recentTransactions.map(transaction => (
                  <tr key={transaction._id}>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.category}</td>
                    <td className={transaction.amount < 0 ? 'text-danger' : 'text-success'}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;