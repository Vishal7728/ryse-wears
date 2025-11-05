const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const productRoutes = require('../routes/products');
const authRoutes = require('../routes/auth');
const adminRoutes = require('../routes/admin');
const paymentRoutes = require('../routes/payment');

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to RYSE Wears API' });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);

// Export for Vercel serverless
module.exports = app;
