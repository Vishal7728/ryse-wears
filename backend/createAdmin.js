const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB Connected...\n');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@rysewears.com' });
    
    if (existingAdmin) {
      console.log('❌ Admin user already exists!');
      console.log('Email: admin@rysewears.com');
      console.log('\nIf you forgot the password, delete this user from MongoDB and run this script again.\n');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      email: 'admin@rysewears.com',
      password: 'Admin@123',
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin'
    });

    await adminUser.save();

    console.log('✅ Admin user created successfully!\n');
    console.log('=================================');
    console.log('Admin Login Credentials:');
    console.log('=================================');
    console.log('Email:    admin@rysewears.com');
    console.log('Password: Admin@123');
    console.log('=================================\n');
    console.log('You can now login at: http://localhost:3000/login');
    console.log('Then access admin panel at: http://localhost:3000/admin/dashboard\n');
    console.log('⚠️  IMPORTANT: Change the password after first login!\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();
