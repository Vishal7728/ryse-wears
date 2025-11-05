const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const imageUpdates = {
  'Designer Silk Saree': 'https://m.media-amazon.com/images/I/71vkKWXZJ7L._SY741_.jpg',
  'Banarasi Silk Saree': 'https://m.media-amazon.com/images/I/81qE5H3qp5L._SY741_.jpg',
  'Anarkali Suit': 'https://m.media-amazon.com/images/I/71K8gKZ5NFL._SY741_.jpg',
  'Punjabi Suit': 'https://m.media-amazon.com/images/I/81JvBQ0HKIL._SY741_.jpg',
  'Lehenga Choli': 'https://m.media-amazon.com/images/I/81fVLhkXvNL._SY741_.jpg',
  'Kurta Pajama Set': 'https://m.media-amazon.com/images/I/61F8XrEOoVL._SY741_.jpg',
  'Sherwani': 'https://m.media-amazon.com/images/I/71UXVLqYqtL._SY741_.jpg',
  'Nehru Jacket': 'https://m.media-amazon.com/images/I/71Bqvp7FGHL._SY741_.jpg',
  'Pathani Suit': 'https://m.media-amazon.com/images/I/71yIW3YxEWL._SY741_.jpg',
  'Bandhani Dupatta': 'https://m.media-amazon.com/images/I/81gxXVQYQfL._SY741_.jpg',
  'Cotton Kurti': 'https://m.media-amazon.com/images/I/71qT5vfVfnL._SY741_.jpg',
  'Chanderi Saree': 'https://m.media-amazon.com/images/I/71DqNXoq8CL._SY741_.jpg'
};

const updateProductImages = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB Connected for updating images...');

    let updateCount = 0;

    // Update each product
    for (const [productName, imageUrl] of Object.entries(imageUpdates)) {
      const result = await Product.updateOne(
        { name: productName },
        { $set: { image: imageUrl } }
      );
      
      if (result.modifiedCount > 0) {
        console.log(`✓ Updated image for: ${productName}`);
        updateCount++;
      } else {
        console.log(`- Product not found or already updated: ${productName}`);
      }
    }

    console.log(`\n${updateCount} product images updated successfully!`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error updating product images:', error);
    process.exit(1);
  }
};

updateProductImages();
