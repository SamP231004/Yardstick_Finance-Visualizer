import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryChart from './CategoryChart';

const CategorySummary = () => {
  const [transactions, setTransactions] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/api/transactions`);
        setTransactions(response.data);

        const filteredTransactions = response.data.filter(transaction => transaction.amount < 0);
        const categories = {};

        filteredTransactions.forEach(transaction => {
          const category = transaction.category || 'Uncategorized';

          if (!categories[category]) {
            categories[category] = {
              category,
              totalAmount: 0,
              count: 0,
              averageAmount: 0,
            };
          }

          categories[category].totalAmount += transaction.amount;
          categories[category].count++;
        });

        const summaryData = Object.values(categories).map(item => ({
          ...item,
          averageAmount: item.totalAmount / item.count,
          totalAmount: Math.abs(item.totalAmount),
        }));

        summaryData.sort((a, b) => b.totalAmount - a.totalAmount);

        setCategorySummary(summaryData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch category data. Please try again later.');
        setLoading(false);
        console.error('Error fetching category data:', err);
      }
    };

    fetchData();
  }, [baseURL]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className='CategoryContainer'>
      {error && <div className="error-message">{error}</div>}

      <div className="categoryCard">
        <div className="categoryTitle">
          <h2>Spending by Category</h2>
        </div>
        <div className="chart-container">
          <CategoryChart transactions={transactions} />
        </div>
      </div>

      <div className="categoryCard">
        <div className="categoryTitle">
          <h2>Category Breakdown</h2>
        </div>

        {categorySummary.length === 0 ? (
          <div className="empty-state">
            <p>No category data available</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total Amount</th>
                  <th>Number of Transactions</th>
                  <th>Average Amount</th>
                </tr>
              </thead>
              <tbody>
                {categorySummary.map(item => (
                  <tr key={item.category}>
                    <td>{item.category}</td>
                    <td>Rs {item.totalAmount.toFixed(2)}</td>
                    <td>{item.count}</td>
                    <td>Rs {Math.abs(item.averageAmount).toFixed(2)}</td>
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

export default CategorySummary;