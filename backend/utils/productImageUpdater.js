const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const imageUpdates = {
  'Designer Silk Saree': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
  'Banarasi Silk Saree': 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=800',
  'Anarkali Suit': 'https://images.unsplash.com/photo-1614095851165-d3e4b7e70b85?w=800',
  'Punjabi Suit': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800',
  'Lehenga Choli': 'https://images.unsplash.com/photo-1595341595155-9f8cd95d3e5f?w=800',
  'Kurta Pajama Set': 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=800',
  'Sherwani': 'https://images.unsplash.com/photo-1606219592522-af678b8e0c8e?w=800',
  'Nehru Jacket': 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800',
  'Pathani Suit': 'https://images.unsplash.com/photo-1622122201714-77da0ca8e5d2?w=800',
  'Bandhani Dupatta': 'https://images.unsplash.com/photo-1610030469837-71c0f6be69a8?w=800',
  'Cotton Kurti': 'https://images.unsplash.com/photo-1617138965535-b071a1e45290?w=800',
  'Chanderi Saree': 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800'
};

const updateProductImages = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL || process.env.DATABASE_URL;
    if (!mongoUrl) {
      console.error('No MongoDB URL found in environment variables');
      process.exit(1);
    }
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUrl);
    console.log('MongoDB Connected for updating images...');

    let updateCount = 0;

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

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error updating product images:', error.message);
    process.exit(1);
  }
};

updateProductImages();