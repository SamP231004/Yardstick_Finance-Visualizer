import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import EditTransaction from './components/EditTransaction';
import CategorySummary from './components/CategorySummary';
import BudgetSettings from './components/BudgetSettings';
import BudgetComparison from './components/BudgetComparison';
import Home from './components/Home'; // Import Home
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home'); // Initial active tab

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Personal Finance Tracker</h1>
          <nav className="main-nav">
            <Link
              to="/"
              className={activeTab === 'home' ? 'active' : ''}
              onClick={() => setActiveTab('home')}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className={activeTab === 'transactions' ? 'active' : ''}
              onClick={() => setActiveTab('transactions')}
            >
              Transactions
            </Link>
            <Link
              to="/categories"
              className={activeTab === 'categories' ? 'active' : ''}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </Link>
            <Link
              to="/budgets"
              className={activeTab === 'budgets' ? 'active' : ''}
              onClick={() => setActiveTab('budgets')}
            >
              Budgets
            </Link>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} exact /> {/* Home route */}
            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route path="/transactions" element={<TransactionList />} exact />
            <Route path="/transactions/add" element={<AddTransaction />} />
            <Route path="/transactions/edit/:id" element={<EditTransaction />} />
            <Route path="/categories" element={<CategorySummary />} />
            <Route path="/budgets" element={<BudgetSettings />} exact />
            <Route path="/budgets/comparison" element={<BudgetComparison />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2025 Personal Finance Tracker</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;