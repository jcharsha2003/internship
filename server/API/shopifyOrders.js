const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define schema
const orderSchema = new mongoose.Schema({
  email: String,
  created_at: String,
  updated_at: String,
  number: Number,
  total_price: String,
  subtotal_price: String,
  total_weight: Number,
  total_tax: String,
  taxes_included: Boolean,
  currency: String,
  financial_status: String,
  line_items: Array,
  customer: Object
});

const Order = mongoose.model('Order', orderSchema);

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
