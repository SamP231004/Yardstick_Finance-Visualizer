import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
  const navigate = useNavigate(); // Use useNavigate

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

    // Clear error for this field
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

      await axios.post('http://localhost:5000/api/transactions', {
        ...formData,
        amount: amountValue,
      });

      navigate('/transactions'); // Use navigate
    } catch (err) {
      setError('Failed to add transaction. Please try again later.');
      setIsSubmitting(false);
      console.error('Error adding transaction:', err);
    }
  };

  return (
    <div className="card">
      <div className="card-title">
        <h2>Add Transaction</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* ... (rest of your form code) ... */}
        <div className="form-actions">
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Transaction'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/transactions')} // Use navigate
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