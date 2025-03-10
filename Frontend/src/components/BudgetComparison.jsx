// frontend/src/components/BudgetComparison.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetComparison = () => {
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

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
    fetchComparisonData();
  }, [month, year]);

  const fetchComparisonData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/budgets/comparison?month=${month}&year=${year}`
      );
      setComparisonData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Budget vs. Actual Comparison</h2>
      <div>
        <label>Month:</label>
        <select value={month} onChange={handleMonthChange}>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={handleYearChange}
          min="2000"
          max={new Date().getFullYear() + 10}
        />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={comparisonData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budgeted" fill="#8884d8" />
          <Bar dataKey="actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <Link to="/budgets">Back to Budgets</Link>
    </div>
  );
};

export default BudgetComparison;