const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: String,
  gender: { type: String, enum: ['Men', 'Women', 'Unisex'] },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
  // Men's T-Shirts
  {
    name: 'Premium Cotton T-Shirt',
    description: 'Soft, breathable premium cotton fabric. Perfect for everyday wear with superior comfort.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Clothing',
    subcategory: 'T-Shirts',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Grey'],
    stock: 150
  },
  {
    name: 'Graphic Print Tee',
    description: 'Trendy graphic design on premium fabric. Stand out with unique style.',
    price: 699,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500',
    category: 'Clothing',
    subcategory: 'T-Shirts',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Olive'],
    stock: 100
  },
  
  // Men's Jeans
  {
    name: 'Slim Fit Denim Jeans',
    description: 'Classic slim fit denim with stretch comfort. Versatile style for any occasion.',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    category: 'Clothing',
    subcategory: 'Jeans',
    gender: 'Men',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    stock: 80
  },
  {
    name: 'Ripped Skinny Jeans',
    description: 'Edgy ripped design with skinny fit. Perfect for a modern, stylish look.',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500',
    category: 'Clothing',
    subcategory: 'Jeans',
    gender: 'Men',
    sizes: ['28', '30', '32', '34'],
    colors: ['Blue', 'Black'],
    stock: 60
  },

  // Men's Shirts
  {
    name: 'Formal Cotton Shirt',
    description: 'Crisp cotton formal shirt. Professional look for office and events.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
    category: 'Clothing',
    subcategory: 'Shirts',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Pink', 'Black'],
    stock: 120
  },
  {
    name: 'Casual Check Shirt',
    description: 'Comfortable check pattern casual shirt. Great for weekend outings.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    category: 'Clothing',
    subcategory: 'Shirts',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Blue', 'Green'],
    stock: 90
  },

  // Women's Tops
  {
    name: 'Floral Print Top',
    description: 'Beautiful floral pattern on soft fabric. Elegant and comfortable.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=500',
    category: 'Clothing',
    subcategory: 'Tops',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pink', 'White', 'Yellow'],
    stock: 110
  },
  {
    name: 'Off-Shoulder Top',
    description: 'Trendy off-shoulder design. Perfect for parties and casual outings.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
    category: 'Clothing',
    subcategory: 'Tops',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Red', 'Blue'],
    stock: 75
  },

  // Women's Dresses
  {
    name: 'Summer Maxi Dress',
    description: 'Flowy maxi dress perfect for summer. Light and breathable fabric.',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    category: 'Clothing',
    subcategory: 'Dresses',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral', 'White', 'Peach'],
    stock: 65
  },
  {
    name: 'Party Cocktail Dress',
    description: 'Elegant cocktail dress for special occasions. Flattering fit and premium finish.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500',
    category: 'Clothing',
    subcategory: 'Dresses',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Red', 'Navy'],
    stock: 45
  },

  // Unisex Hoodies
  {
    name: 'Classic Pullover Hoodie',
    description: 'Cozy fleece hoodie with kangaroo pocket. Ultimate comfort for all-day wear.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    category: 'Clothing',
    subcategory: 'Hoodies',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Grey', 'Navy', 'Maroon'],
    stock: 130
  },
  {
    name: 'Zip-Up Hoodie',
    description: 'Versatile zip-up design with side pockets. Perfect layering piece.',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
    category: 'Clothing',
    subcategory: 'Hoodies',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Olive'],
    stock: 95
  },

  // Accessories
  {
    name: 'Leather Belt',
    description: 'Genuine leather belt with sleek buckle. Essential wardrobe staple.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    subcategory: 'Belts',
    gender: 'Unisex',
    sizes: ['S', 'M', 'L'],
    colors: ['Brown', 'Black'],
    stock: 70
  },
  {
    name: 'Baseball Cap',
    description: 'Classic baseball cap with adjustable strap. Casual style essential.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500',
    category: 'Accessories',
    subcategory: 'Caps',
    gender: 'Unisex',
    sizes: ['One Size'],
    colors: ['Black', 'Navy', 'White', 'Red'],
    stock: 150
  },

  // Women's Jeans
  {
    name: 'High-Waist Skinny Jeans',
    description: 'Flattering high-waist fit with stretch denim. Perfect silhouette.',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
    category: 'Clothing',
    subcategory: 'Jeans',
    gender: 'Women',
    sizes: ['26', '28', '30', '32', '34'],
    colors: ['Dark Blue', 'Black', 'Light Blue'],
    stock: 85
  },
  {
    name: 'Boyfriend Fit Jeans',
    description: 'Relaxed boyfriend fit for ultimate comfort. Trendy and versatile.',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500',
    category: 'Clothing',
    subcategory: 'Jeans',
    gender: 'Women',
    sizes: ['26', '28', '30', '32'],
    colors: ['Blue', 'Light Wash'],
    stock: 70
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/ryse_wears');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const result = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully added ${result.length} products to database`);

    console.log('\nProduct Summary:');
    const categories = await Product.aggregate([
      { $group: { _id: '$subcategory', count: { $sum: 1 } } }
    ]);
    categories.forEach(cat => {
      console.log(`  - ${cat._id}: ${cat.count} products`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
