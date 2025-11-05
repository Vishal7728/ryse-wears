const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const indianTraditionalWear = [
  {
    name: 'Designer Silk Saree',
    description: 'Elegant pure silk saree with intricate embroidery and golden border. Perfect for weddings and special occasions.',
    price: 3499,
    image: 'https://m.media-amazon.com/images/I/71vkKWXZJ7L._SY741_.jpg',
    category: 'Traditional',
    subcategory: 'Sarees',
    gender: 'Women',
    sizes: ['Free Size'],
    colors: ['Red', 'Gold', 'Maroon'],
    stock: 25
  },
  {
    name: 'Banarasi Silk Saree',
    description: 'Traditional Banarasi silk saree with zari work. Handwoven with rich textures and timeless elegance.',
    price: 4999,
    image: 'https://m.media-amazon.com/images/I/81qE5H3qp5L._SY741_.jpg',
    category: 'Traditional',
    subcategory: 'Sarees',
    gender: 'Women',
    sizes: ['Free Size'],
    colors: ['Royal Blue', 'Green', 'Pink'],
    stock: 20
  },
  {
    name: 'Anarkali Suit',
    description: 'Beautiful Anarkali suit with heavy embroidery work. Includes kurta, leggings, and dupatta.',
    price: 2999,
    image: 'https://m.media-amazon.com/images/I/71K8gKZ5NFL._SY741_.jpg',
    category: 'Traditional',
    subcategory: 'Suits',
    gender: 'Women',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Red', 'Blue', 'Green'],
    stock: 30
  },
  {
    name: 'Punjabi Suit',
    description: 'Vibrant Punjabi suit with phulkari embroidery. Comfortable and stylish for daily wear.',
    price: 1899,
    image: 'https://m.media-amazon.com/images/I/81JvBQ0HKIL._SY741_.jpg',
    category: 'Traditional',
    subcategory: 'Suits',
    gender: 'Women',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Yellow', 'Orange', 'Pink', 'White'],
    stock: 35
  },
  {
    name: 'Lehenga Choli',
    description: 'Stunning bridal lehenga choli with intricate mirror work and heavy embellishments.',
    price: 8999,
    image: 'https://m.media-amazon.com/images/I/81fVLhkXvNL._SY741_.jpg',
    category: 'Traditional',
    subcategory: 'Lehenga',
    gender: 'Women',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Pink', 'Maroon', 'Gold'],
    stock: 15
  },
  {
    name: 'Kurta Pajama Set',
    description: 'Classic mens kurta pajama in premium cotton. Perfect for festivals and traditional occasions.',
    price: 1499,
    image: 'https://m.media-amazon.com/images/I/61F8XrEOoVL._SY741_.jpg',
    category: 'Traditional',
    subcategory: 'Kurta',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Cream', 'Blue', 'Black'],
    stock: 40
  },
  {
    name: 'Sherwani',
    description: 'Royal sherwani with intricate embroidery. Ideal for weddings and grand celebrations.',
    price: 6499,
    image: 'https://m.media-amazon.com/images/I/71UXVLqYqtL._SY741_.jpg',
    category: 'Traditional',
    subcategory: 'Sherwani',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gold', 'Maroon', 'Cream', 'Royal Blue'],
    stock: 18
  },
  {
    name: 'Nehru Jacket',
    description: 'Contemporary Nehru jacket with modern cuts. Can be paired with kurtas or western wear.',
    price: 2299,
    image: 'https://m.media-amazon.com/images/I/71Bqvp7FGHL._SY741_.jpg',
    category: 'Traditional',
    subcategory: 'Jackets',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Maroon', 'Grey'],
    stock: 32
  },
  {
    name: 'Pathani Suit',
    description: 'Comfortable Pathani suit in soft cotton. Great for casual traditional occasions.',
    price: 1799,
    image: 'https://m.media-amazon.com/images/I/71yIW3YxEWL._SY741_.jpg',
    category: 'Traditional',
    subcategory: 'Kurta',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Grey', 'Brown'],
    stock: 28
  },
  {
    name: 'Bandhani Dupatta',
    description: 'Traditional Bandhani dupatta with vibrant colors. Handcrafted with tie-dye technique.',
    price: 899,
    image: 'https://m.media-amazon.com/images/I/81gxXVQYQfL._SY741_.jpg',
    category: 'Traditional',
    subcategory: 'Accessories',
    gender: 'Women',
    sizes: ['Free Size'],
    colors: ['Red', 'Yellow', 'Green', 'Blue'],
    stock: 50
  },
  {
    name: 'Cotton Kurti',
    description: 'Comfortable cotton kurti with block print design. Perfect for daily wear.',
    price: 799,
    image: 'https://m.media-amazon.com/images/I/71qT5vfVfnL._SY741_.jpg',
    category: 'Traditional',
    subcategory: 'Kurti',
    gender: 'Women',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'White', 'Pink', 'Yellow'],
    stock: 45
  },
  {
    name: 'Chanderi Saree',
    description: 'Lightweight Chanderi saree with traditional motifs. Perfect for summer occasions.',
    price: 2499,
    image: 'https://m.media-amazon.com/images/I/71DqNXoq8CL._SY741_.jpg',
    category: 'Traditional',
    subcategory: 'Sarees',
    gender: 'Women',
    sizes: ['Free Size'],
    colors: ['Peach', 'Mint', 'Lavender', 'Cream'],
    stock: 22
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB Connected for seeding...');

    // Clear existing products (optional - comment out if you want to keep existing)
    // await Product.deleteMany({});
    // console.log('Existing products cleared');

    // Insert Indian traditional wear products
    const products = await Product.insertMany(indianTraditionalWear);
    console.log(`${products.length} Indian traditional wear products added successfully!`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
