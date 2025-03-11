import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().substr(0, 10),
    category: 'Uncategorized',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const categories = [
    'Uncategorized',
    'Food',
    'Transportation',
    'Housing',
    'Utilities',
    'Entertainment',
    'Shopping',
    'Healthcare',
    'Education',
    'Personal Care',
    'Income',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount)) {
      newErrors.amount = 'Amount must be a number';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const amountValue =
        formData.category === 'Income'
          ? Math.abs(parseFloat(formData.amount))
          : -Math.abs(parseFloat(formData.amount));

      await axios.post(`${baseURL}/api/transactions`, {
        ...formData,
        amount: amountValue,
      });

      navigate('/transactions');
    } catch (err) {
      setError('Failed to add transaction. Please try again later.');
      setIsSubmitting(false);
      console.error('Error adding transaction:', err);
    }
  };

  return (
    <div className="addTransactionContainer">
      <div className="card-title">
        <h2>Add Transaction</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className='addTransactionForm' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className={errors.amount ? 'error' : ''}
          />
          {errors.amount && <div className="error-message">{errors.amount}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <div className="error-message">{errors.date}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="addTransactionBtn">
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Transaction'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/transactions')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;