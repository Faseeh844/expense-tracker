const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');

// Get All
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add One
router.post('/', auth, async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const newExpense = new Expense({
      userId: req.user,
      title, amount, category, date
    });
    const saved = await newExpense.save();
    res.json(saved);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update One
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    // Make sure user owns the expense
    if (expense.userId.toString() !== req.user) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    expense = await Expense.findByIdAndUpdate(req.params.id, { $set: { title, amount, category, date } }, { new: true });

    res.json(expense);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete One
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: 'Not found' });
    if (expense.userId.toString() !== req.user) return res.status(401).json({ msg: 'Not authorized' });

    await expense.deleteOne();
    res.json({ msg: 'Removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;