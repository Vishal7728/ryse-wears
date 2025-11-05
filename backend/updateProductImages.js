const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const imageUpdates = {
  'Designer Silk Saree': 'https://images.pexels.com/photos/3927392/pexels-photo-3927392.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Banarasi Silk Saree': 'https://images.pexels.com/photos/8442133/pexels-photo-8442133.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Anarkali Suit': 'https://images.pexels.com/photos/8442136/pexels-photo-8442136.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Punjabi Suit': 'https://images.pexels.com/photos/6069004/pexels-photo-6069004.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Lehenga Choli': 'https://images.pexels.com/photos/14704788/pexels-photo-14704788.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Kurta Pajama Set': 'https://images.pexels.com/photos/8442129/pexels-photo-8442129.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Sherwani': 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Nehru Jacket': 'https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Pathani Suit': 'https://images.pexels.com/photos/8442140/pexels-photo-8442140.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Bandhani Dupatta': 'https://images.pexels.com/photos/6069042/pexels-photo-6069042.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Cotton Kurti': 'https://images.pexels.com/photos/8442135/pexels-photo-8442135.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Chanderi Saree': 'https://images.pexels.com/photos/9736200/pexels-photo-9736200.jpeg?auto=compress&cs=tinysrgb&w=800'
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
