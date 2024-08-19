const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define schema
const productSchema = new mongoose.Schema({
  title: String,
  body_html: String,
  created_at: String,
  handle: String,
  product_type: String,
  published_at: String,
  status: String,
  tags: String,
  variants: Array,
  vendor: String
});

const Product = mongoose.model('Product', productSchema);

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
