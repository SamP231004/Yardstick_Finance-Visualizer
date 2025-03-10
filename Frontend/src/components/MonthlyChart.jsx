// Frontend/components/MonthlyChart.jsx

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyChart = ({ transactions }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (!transactions || transactions.length === 0) {
            setChartData([]);
            return;
        }

        const data = transactions.map(transaction => {
            const monthYear = new Date(transaction._id.year, transaction._id.month - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            return { month: monthYear, income: transaction.income, expenses: transaction.expenses };
        });
        setChartData(data);
    }, [transactions]);

    if (chartData.length === 0) {
        return <div className="empty-state">No data available for chart</div>;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rs ${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="income" fill="#4caf50" name="Income" />
                <Bar dataKey="expenses" fill="#f44336" name="Expenses" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MonthlyChart;