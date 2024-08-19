const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define schema
const customerSchema = new mongoose.Schema({
  email: String,
  first_name: String,
  last_name: String,
  orders_count: Number,
  total_spent: String,
  created_at: String,
  updated_at: String,
  state: String,
  verified_email: Boolean,
  addresses: Array
});

const Customer = mongoose.model('Customer', customerSchema);

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
