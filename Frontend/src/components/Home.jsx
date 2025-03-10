import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Your Personal Finance Tracker</h1>
      <p>
        This application helps you manage your finances, track transactions,
        analyze spending, and set budgets.
      </p>
      <p>Here's what you can do:</p>
      <ul>
        <li>
          <strong>Dashboard:</strong> Get an overview of your financial health.
        </li>
        <li>
          <strong>Transactions:</strong> Add, edit, and view your transactions.
        </li>
        <li>
          <strong>Categories:</strong> Analyze your spending by category.
        </li>
        <li>
          <strong>Budgets:</strong> Set and track your budgets.
        </li>
      </ul>
      <p>Get started by exploring the navigation links above!</p>
    </div>
  );
};

export default Home;