const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// Remove all remaining Indian traditional outfits
const indianOutfitsToRemove = [
  'Punjabi Suit',
  'Kurta Pajama Set',
  'Nehru Jacket',
  'Pathani Suit'
];

const cleanupIndianOutfits = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB Connected...\n');

    console.log('Removing remaining Indian traditional outfits...');
    const deleteResult = await Product.deleteMany({ name: { $in: indianOutfitsToRemove } });
    console.log(`✓ Removed ${deleteResult.deletedCount} Indian outfit products\n`);

    console.log('Cleanup completed successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

cleanupIndianOutfits();
