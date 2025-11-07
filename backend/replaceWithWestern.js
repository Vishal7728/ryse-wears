const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const productsToRemove = [
  'Sherwani',
  'Cotton Kurti',
  'Bandhani Dupatta',
  'Lehenga Choli',
  'Anarkali Suit',
  'Designer Silk Saree',
  'Banarasi Silk Saree',
  'Chanderi Saree'
];

const westernProducts = [
  {
    name: 'Denim Jacket',
    description: 'Classic blue denim jacket with distressed details',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    category: 'Western',
    subcategory: 'Jackets',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black', 'Light Blue'],
    stock: 30
  },
  {
    name: 'Leather Jacket',
    description: 'Premium black leather biker jacket',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    category: 'Western',
    subcategory: 'Jackets',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Brown'],
    stock: 20
  },
  {
    name: 'Blazer',
    description: 'Formal fitted blazer for office and events',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
    category: 'Western',
    subcategory: 'Blazers',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Grey'],
    stock: 25
  },
  {
    name: 'Chinos',
    description: 'Comfortable cotton chino pants',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800',
    category: 'Western',
    subcategory: 'Pants',
    gender: 'Men',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Beige', 'Navy', 'Black', 'Olive'],
    stock: 40
  },
  {
    name: 'Cargo Pants',
    description: 'Trendy cargo pants with multiple pockets',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    category: 'Western',
    subcategory: 'Pants',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Khaki', 'Black', 'Olive', 'Grey'],
    stock: 35
  },
  {
    name: 'Polo Shirt',
    description: 'Classic polo shirt for casual wear',
    price: 899,
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800',
    category: 'Western',
    subcategory: 'Shirts',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy', 'Red'],
    stock: 50
  },
  {
    name: 'Sweater',
    description: 'Cozy knitted sweater for winter',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    category: 'Western',
    subcategory: 'Sweaters',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black', 'Navy', 'Beige'],
    stock: 30
  },
  {
    name: 'Sneakers',
    description: 'Trendy casual sneakers',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
    category: 'Western',
    subcategory: 'Footwear',
    gender: 'Unisex',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Black', 'Grey'],
    stock: 45
  }
];

const replaceProducts = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB Connected...\n');

    console.log('Removing traditional wear products...');
    const deleteResult = await Product.deleteMany({ name: { $in: productsToRemove } });
    console.log(`✓ Removed ${deleteResult.deletedCount} products\n`);

    console.log('Adding Western fashion products...');
    const insertResult = await Product.insertMany(westernProducts);
    console.log(`✓ Added ${insertResult.length} new Western fashion products\n`);

    console.log('Products successfully replaced!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

replaceProducts();
