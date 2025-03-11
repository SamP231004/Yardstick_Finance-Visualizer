import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditTransaction = () => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: '',
    category: 'Uncategorized',
  });
  const [originalAmount, setOriginalAmount] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/transactions/${id}`);
        const transaction = response.data;

        setOriginalAmount(transaction.amount);

        setFormData({
          description: transaction.description,
          amount: Math.abs(transaction.amount).toString(),
          date: new Date(transaction.date).toISOString().split('T')[0],
          category: transaction.category || 'Uncategorized',
        });

        setIsLoading(false);
      } catch (err) {
        setError('Failed to load transaction. Please try again later.');
        setIsLoading(false);
        console.error('Error fetching transaction:', err);
      }
    };

    fetchTransaction();
  }, [id, baseURL]);

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

      await axios.put(`${baseURL}/api/transactions/${id}`, {
        ...formData,
        amount: amountValue,
      });

      navigate('/transactions');
    } catch (err) {
      setError('Failed to update transaction. Please try again later.');
      setIsSubmitting(false);
      console.error('Error updating transaction:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-title">
        <h2>Edit Transaction</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* ... (rest of your form code) ... */}
        <div className="form-actions">
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Transaction'}
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

export default EditTransaction;