import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BudgetSettings = () => {
  const [budgets, setBudgets] = useState([]);
  const [formData, setFormData] = useState({
    category: 'Food',
    amount: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:5000'; // Corrected baseURL

  const categories = [
    'Food',
    'Transportation',
    'Housing',
    'Utilities',
    'Entertainment',
    'Shopping',
    'Healthcare',
    'Education',
    'Personal Care'
  ];

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  useEffect(() => {
    fetchBudgets();
  }, [baseURL]); // added baseURL to dependency array

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/api/budgets`); // Corrected axios.get URL
      setBudgets(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch budgets. Please try again later.');
      setLoading(false);
      console.error('Error fetching budgets:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post(`${baseURL}/api/budgets`, { // Corrected axios.post URL
        ...formData,
        amount: parseFloat(formData.amount)
      });

      setSuccess('Budget added successfully!');
      setFormData({
        ...formData,
        amount: ''
      });

      fetchBudgets();
    } catch (err) {
      setError('Failed to add budget. Please try again later.');
      console.error('Error adding budget:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteBudget = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await axios.delete(`${baseURL}/api/budgets/${id}`); // Corrected axios.delete URL
        fetchBudgets();
      } catch (err) {
        setError('Failed to delete budget. Please try again later.');
        console.error('Error deleting budget:', err);
      }
    }
  };

  return (
    <div className='budgetContainer'>
      <div className="budgetCard">
        <div className="budgetTitle">
          <h2>Budget Settings</h2>
          <Link to="/budgets/comparison" className="budgetBtn">View Comparison</Link>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="amount">Budget Amount (Rs)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                className="form-control"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="month">Month</label>
              <select
                id="month"
                name="month"
                className="form-control"
                value={formData.month}
                onChange={handleChange}
              >
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                id="year"
                name="year"
                className="form-control"
                value={formData.year}
                onChange={handleChange}
                min="2020"
                max="2030"
              />
            </div>
          </div>

          <button className="addBudget" type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Budget'}
          </button>
        </form>
      </div>

      <div className="budgetCard">
        <div className="budgetTitle">
          <h2>Current Budgets</h2>
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
          </div>
        ) : budgets.length === 0 ? (
          <div className="empty-state">
            <p>No budgets set yet. Add your first budget above.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Budget Amount</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map(budget => (
                  <tr key={budget._id}>
                    <td>{budget.category}</td>
                    <td>Rs {budget.amount.toFixed(2)}</td>
                    <td>{months.find(m => m.value === budget.month)?.label}</td>
                    <td>{budget.year}</td>
                    <td>
                      <button
                        onClick={() => deleteBudget(budget._id)}
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
    </div>
  );
};

export default BudgetSettings;