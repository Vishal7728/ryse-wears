const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const authenticateToken = require('../middleware/auth');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// Get dashboard analytics
router.get('/dashboard/analytics', authenticateToken, isAdmin, async (req, res) => {
  try {
    // Aggregate sales data by category, gender, and subcategory
    const analytics = await Order.aggregate([
      { $match: { status: 'delivered' } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $lookup: {
          from: 'categories',
          localField: 'product.category_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      {
        $group: {
          _id: {
            category_name: '$category.name',
            gender: '$product.gender',
            subcategory: '$product.subcategory'
          },
          total_quantity: { $sum: '$items.quantity' },
          total_revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
          total_orders: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category_name: '$_id.category_name',
          gender: '$_id.gender',
          subcategory: '$_id.subcategory',
          total_quantity: 1,
          total_revenue: 1,
          total_orders: 1
        }
      },
      { $sort: { total_revenue: -1 } }
    ]);
    
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all products
router.get('/products', authenticateToken, isAdmin, async (req, res) => {
  try {
    const products = await Product.find().populate('category_id');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get product by ID
router.get('/products/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category_id');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new product
router.post('/products', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, description, price, image_url, category_id, subcategory, gender, size, color, stock_quantity } = req.body;
    
    // Validate required fields
    if (!name || !price || !category_id) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }
    
    const product = new Product({
      name,
      description,
      price,
      image_url,
      category_id,
      subcategory: subcategory || null,
      gender: gender || 'Unisex',
      size: size || null,
      color: color || null,
      stock_quantity: stock_quantity || 0
    });
    
    await product.save();
    
    // Populate category before sending response
    await product.populate('category_id');
    
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product
router.put('/products/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category_id');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product
router.delete('/products/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all categories
router.get('/categories', authenticateToken, isAdmin, async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new category
router.post('/categories', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders
router.get('/orders', authenticateToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user_id').populate('items.product_id');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;