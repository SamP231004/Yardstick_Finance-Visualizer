import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CategoryChart = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);
  
  // Define colors for categories
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57', '#83a6ed'];

  useEffect(() => {
    if (!transactions || transactions.length === 0) {
      setChartData([]);
      return;
    }

    // Filter for expense transactions only
    const expenses = transactions.filter(t => t.amount < 0);
    
    // Group by category
    const categoryMap = {};
    
    expenses.forEach(transaction => {
      const category = transaction.category || 'Uncategorized';
      
      if (!categoryMap[category]) {
        categoryMap[category] = 0;
      }
      
      categoryMap[category] += Math.abs(transaction.amount);
    });
    
    // Convert to array format for PieChart
    const data = Object.keys(categoryMap).map(category => ({
      name: category,
      value: categoryMap[category]
    }));
    
    // Sort by value descending
    data.sort((a, b) => b.value - a.value);
    
    setChartData(data);
  }, [transactions]);

  if (chartData.length === 0) {
    return <div className="empty-state">No expense data available for chart</div>;
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryChart;