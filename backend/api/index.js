const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const path = require('path');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '../../frontend/public/images')));

const productRoutes = require('../routes/products');
const authRoutes = require('../routes/auth');
const adminRoutes = require('../routes/admin');
const paymentRoutes = require('../routes/payment');

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to RYSE Wears API' });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);

module.exports = app;