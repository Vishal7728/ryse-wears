const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGODB_URL:', process.env.MONGODB_URL ? 'Loaded' : 'Not found');
    
    // Try to connect
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✓ MongoDB Connected Successfully');
    
    // Try to fetch products
    const Product = require('./models/Product');
    const products = await Product.find({}).limit(5);
    console.log(`✓ Found ${products.length} products in database`);
    
    if (products.length > 0) {
      console.log('Sample product images:');
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name}: ${product.image}`);
      });
    }
    
    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
};

testConnection();