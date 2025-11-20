import React, { useState, useEffect } from 'react';
import { api } from '../api';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function AddExpenseModal({ token, onClose, onSuccess, categories, expenseToEdit }) {
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0] });
  const [loading, setLoading] = useState(false);

  const isEditing = !!expenseToEdit;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: expenseToEdit.title,
        amount: expenseToEdit.amount,
        category: expenseToEdit.category,
        date: new Date(expenseToEdit.date).toISOString().split('T')[0],
      });
    }
  }, [expenseToEdit, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = isEditing ? await api.updateExpense(token, expenseToEdit._id, formData) : await api.addExpense(token, formData);
      onSuccess(result, isEditing);
    } catch (err) {
      alert('Error saving expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{isEditing ? 'Edit Expense' : 'Add New Expense'}</h3>
          <button onClick={onClose} className="modal-close-button">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <Input 
            label="Title" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            placeholder="e.g., Lunch at Subway" 
            required 
          />
          
          <div className="form-grid">
             <div>
                <label className="input-label">Amount (₹)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                  className="input-field"
                  required
                />
             </div>
             <div>
                <label className="input-label">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="input-field"
                  required
                />
             </div>
          </div>

          <div className="category-selector-container">
            <label className="input-label">Category</label>
            <div className="category-selector">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({...formData, category: cat})}
                  className={`category-button ${
                    formData.category === cat 
                      ? 'active' 
                      : ''
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <Button onClick={onClose} className="button-secondary flex-1">Cancel</Button>
            <Button className="flex-1" isLoading={loading}>{isEditing ? 'Save Changes' : 'Save Expense'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}