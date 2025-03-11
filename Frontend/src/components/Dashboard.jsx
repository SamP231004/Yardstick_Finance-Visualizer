import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MonthlyChart from './MonthlyChart';
import CategoryChart from './CategoryChart';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [monthlySummary, setMonthlySummary] = useState([]);
    const [categorySummary, setCategorySummary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const baseURL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
                const [transactionsResponse, monthlyResponse, categoryResponse] = await axios.all([
                    axios.get(`${baseURL}/api/transactions`),
                    axios.get(`${baseURL}/api/transactions/summary/monthly`),
                    axios.get(`${baseURL}/api/transactions/summary/category`),
                ]);

                if (Array.isArray(transactionsResponse.data)) {
                    setTransactions(transactionsResponse.data);
                } else {
                    setTransactions([]);
                    setError('Invalid data format received from the server.');
                }
                setMonthlySummary(monthlyResponse.data);
                setCategorySummary(categoryResponse.data);

            } catch (err) {
                setError('Failed to fetch dashboard data. Please try again later.');
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const totalExpenses = Array.isArray(transactions)
        ? transactions.reduce((acc, curr) => (curr.amount < 0 ? acc + Math.abs(curr.amount) : acc), 0)
        : 0;

    const totalIncome = Array.isArray(transactions)
        ? transactions.reduce((acc, curr) => (curr.amount > 0 ? acc + curr.amount : acc), 0)
        : 0;

    const balance = totalIncome - totalExpenses;

    console.log("Monthly Summary:", monthlySummary);
    console.log("Category Summary:", categorySummary);

    return (
        <div className="dashboard-container">
            <div className="dashboard-summary">
                <div className="summary-card">
                    <div className="card-title">Balance</div>
                    <div className="card-value">Rs {balance.toFixed(2)}</div>
                </div>
                <div className="summary-card">
                    <div className="card-title">Total Expenses</div>
                    <div className="card-value">Rs {totalExpenses.toFixed(2)}</div>
                </div>
                <div className="summary-card">
                    <div className="card-title">Total Income</div>
                    <div className="card-value">Rs {totalIncome.toFixed(2)}</div>
                </div>
            </div>

            <div className="dashboard-charts">
                <div className="chart-container">
                    <MonthlyChart transactions={monthlySummary} currency="Rs" />
                    {console.dir("Monthly Summary:", monthlySummary)}
                </div>
                <div className="chart-container">
                    <CategoryChart transactions={transactions} currency="Rs" />
                </div>
            </div>

            <div className='TableComponent'>
                <h2 className="recent-transactions-title">Recent Transactions</h2>
                {Array.isArray(transactions) && transactions.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📊</div>
                        <p>No transactions yet. <Link to="/transactions/add">Add your first transaction</Link> to get started!</p>
                    </div>
                ) : Array.isArray(transactions) ? (
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
                                {transactions.slice(0, 5).map(transaction => (
                                    <tr key={transaction._id}>
                                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                        <td>{transaction.description}</td>
                                        <td>{transaction.category}</td>
                                        <td className={transaction.amount < 0 ? 'text-danger' : 'text-success'}>
                                            Rs {Math.abs(transaction.amount).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Link to="/transactions" className="btn btn-secondary">View All Transactions</Link>
                    </div>
                ) : (
                    <div className="error-message">Error: Transactions data is not available.</div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;