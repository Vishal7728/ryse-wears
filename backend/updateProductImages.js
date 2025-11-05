const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const imageUpdates = {
  'Designer Silk Saree': 'https://placehold.co/600x800/red/white?text=Designer+Silk+Saree',
  'Banarasi Silk Saree': 'https://placehold.co/600x800/0000FF/white?text=Banarasi+Silk+Saree',
  'Anarkali Suit': 'https://placehold.co/600x800/FF1493/white?text=Anarkali+Suit',
  'Punjabi Suit': 'https://placehold.co/600x800/FFD700/black?text=Punjabi+Suit',
  'Lehenga Choli': 'https://placehold.co/600x800/8B0000/white?text=Lehenga+Choli',
  'Kurta Pajama Set': 'https://placehold.co/600x800/F5F5DC/black?text=Kurta+Pajama',
  'Sherwani': 'https://placehold.co/600x800/DAA520/white?text=Sherwani',
  'Nehru Jacket': 'https://placehold.co/600x800/000000/white?text=Nehru+Jacket',
  'Pathani Suit': 'https://placehold.co/600x800/808080/white?text=Pathani+Suit',
  'Bandhani Dupatta': 'https://placehold.co/600x800/FF69B4/white?text=Bandhani+Dupatta',
  'Cotton Kurti': 'https://placehold.co/600x800/87CEEB/black?text=Cotton+Kurti',
  'Chanderi Saree': 'https://placehold.co/600x800/FFE4B5/black?text=Chanderi+Saree'
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
