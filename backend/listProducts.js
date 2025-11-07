const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const listProducts = async () => {
  try {
    // Connect to MongoDB
    const mongoUrl = process.env.MONGODB_URL || process.env.DATABASE_URL;
    if (!mongoUrl) {
      console.error('No MongoDB URL found in environment variables');
      process.exit(1);
    }
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUrl);
    console.log('MongoDB Connected successfully!\n');

    // Fetch all products
    const products = await Product.find({}).sort({ created_at: -1 });
    
    console.log(`Found ${products.length} products in the database:\n`);
    
    if (products.length > 0) {
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name}`);
        console.log(`   ID: ${product._id}`);
        console.log(`   Category: ${product.category}`);
        console.log(`   Subcategory: ${product.subcategory || 'N/A'}`);
        console.log(`   Gender: ${product.gender || 'Unisex'}`);
        console.log(`   Price: ₹${product.price}`);
        console.log(`   Current Image URL: ${product.image}`);
        console.log(`   Stock: ${product.stock || 0}`);
        console.log('   ---');
      });
    } else {
      console.log('No products found in the database.');
      
      // Show mock data structure
      console.log('\nMock data structure used in frontend:');
      const mockProducts = [
        {
          id: '1',
          name: 'Designer Silk Saree',
          price: 3499,
          description: 'Elegant pure silk saree with intricate embroidery',
          image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop',
          category: 'Sarees',
          subcategory: 'Sarees',
          gender: 'Women'
        },
        {
          id: '2',
          name: 'Banarasi Silk Saree',
          price: 4999,
          description: 'Traditional Banarasi silk saree with zari work',
          image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=800&h=1000&fit=crop',
          category: 'Sarees',
          subcategory: 'Sarees',
          gender: 'Women'
        },
        {
          id: '3',
          name: 'Anarkali Suit',
          price: 2999,
          description: 'Beautiful Anarkali suit with heavy embroidery',
          image: 'https://images.unsplash.com/photo-1614095851165-d3e4b7e70b85?w=800&h=1000&fit=crop',
          category: 'Suits',
          subcategory: 'Suits',
          gender: 'Women'
        },
        {
          id: '4',
          name: 'Punjabi Suit',
          price: 1899,
          description: 'Vibrant Punjabi suit with phulkari embroidery',
          image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&h=1000&fit=crop',
          category: 'Suits',
          subcategory: 'Suits',
          gender: 'Women'
        },
        {
          id: '5',
          name: 'Lehenga Choli',
          price: 8999,
          description: 'Stunning bridal lehenga choli with mirror work',
          image: 'https://images.unsplash.com/photo-1595341595155-9f8cd95d3e5f?w=800&h=1000&fit=crop',
          category: 'Lehenga',
          subcategory: 'Lehenga',
          gender: 'Women'
        },
        {
          id: '6',
          name: 'Kurta Pajama Set',
          price: 1499,
          description: 'Classic mens kurta pajama in premium cotton',
          image: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=800&h=1000&fit=crop',
          category: 'Kurta',
          subcategory: 'Kurta',
          gender: 'Men'
        },
        {
          id: '7',
          name: 'Sherwani',
          price: 6499,
          description: 'Royal sherwani with intricate embroidery',
          image: 'https://images.unsplash.com/photo-1606219592522-af678b8e0c8e?w=800&h=1000&fit=crop',
          category: 'Sherwani',
          subcategory: 'Sherwani',
          gender: 'Men'
        },
        {
          id: '8',
          name: 'Nehru Jacket',
          price: 2299,
          description: 'Contemporary Nehru jacket with modern cuts',
          image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&h=1000&fit=crop',
          category: 'Jackets',
          subcategory: 'Jackets',
          gender: 'Men'
        }
      ];
      
      mockProducts.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name}`);
        console.log(`   Current Image URL: ${product.image}`);
        console.log('   ---');
      });
    }

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error listing products:', error.message);
    process.exit(1);
  }
};

listProducts();