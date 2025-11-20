import React, { useState, useEffect, useMemo } from 'react';
import { Plus, LogOut, Trash2, Loader, FilePenLine } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../api';
import AddExpenseModal from './AddExpenseModal';
import Button from '../ui/Button';

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Health', 'Other'];
// Colors for the pie chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4242'];

export default function Dashboard({ user, token, onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await api.getExpenses(token);
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
        // Optionally, show an error to the user
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [token]);

  const handleModalSuccess = (result, isEditing) => {
    if (isEditing) {
      setExpenses(expenses.map(exp => exp._id === result._id ? result : exp).sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else {
      setExpenses([result, ...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)));
    }
    handleModalClose();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = async (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.deleteExpense(token, expenseId);
        setExpenses(expenses.filter(exp => exp._id !== expenseId));
      } catch (error) {
        console.error('Failed to delete expense:', error);
        alert('Could not delete expense.');
      }
    }
  };

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const chartData = useMemo(() => {
    if (!expenses.length) return [];

    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  }, [expenses]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome, {user.name}!</h1>
          <p className="dashboard-subtitle">Here's your expense summary.</p>
        </div>
        <div className="dashboard-actions">
          <Button onClick={() => setIsModalOpen(true)}> {/* This will open the modal for adding */}
            <Plus size={16} className="button-icon" />
            Add Expense
          </Button>
          <Button onClick={onLogout} className="button-secondary">
            <LogOut size={16} className="button-icon" />
            Logout
          </Button>
        </div>
      </header>

      <main>
        <div className="dashboard-grid">
          <div className="summary-card">
            <h3 className="summary-title">Total Expenses</h3>
            <p className="summary-amount">₹{totalAmount.toFixed(2)}</p>
          </div>
          <div className="chart-container">
            <h3 className="chart-title">Expense Breakdown</h3>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="empty-chart-state">No data for chart</p>
            )}
          </div>
        </div>

        <div className="expense-list-container">
          <h2 className="expense-list-title">Recent Transactions</h2>
          {loading ? (
            <div className="loader-container"><Loader className="loader-icon" /></div>
          ) : expenses.length > 0 ? (
            <ul className="expense-list">
              {expenses.map(exp => (
                <li key={exp._id} className="expense-item">
                  <div className="expense-item-details">
                    <span className="expense-item-title">{exp.title}</span>
                    <span className="expense-item-category">{exp.category}</span>
                  </div>
                  <div className="expense-item-right">
                    <span className="expense-item-amount">-₹{exp.amount.toFixed(2)}</span>
                    <span className="expense-item-date">{new Date(exp.date).toLocaleDateString()}</span>
                    <button onClick={() => handleEditClick(exp)} className="edit-button">
                      <FilePenLine size={16} />
                    </button>
                    <button onClick={() => handleDelete(exp._id)} className="delete-button">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">No expenses yet. Add one to get started!</p>
          )}
        </div>
      </main>

      {isModalOpen && (
        <AddExpenseModal 
          token={token}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
          categories={CATEGORIES}
          expenseToEdit={editingExpense}
        />
      )}
    </div>
  );
}