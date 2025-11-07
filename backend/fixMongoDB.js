const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('RYSE Wears - MongoDB Connection Fix');
console.log('==================================\n');

// Check current MongoDB URL
console.log('Current MONGODB_URL:');
console.log(process.env.MONGODB_URL);
console.log('');

// Parse the connection string to show components
try {
  const url = new URL(process.env.MONGODB_URL);
  console.log('Connection Details:');
  console.log('- Host:', url.hostname);
  console.log('- Database:', url.pathname.substring(1));
  console.log('- Username:', url.username);
  console.log('- Password: ********'); // Don't show password
  console.log('');
} catch (error) {
  console.log('Could not parse MongoDB URL:', error.message);
}

console.log('Troubleshooting Steps:');
console.log('1. Verify your MongoDB Atlas credentials at https://cloud.mongodb.com');
console.log('2. Check if the user "kumaradik37_db_user" exists and has proper permissions');
console.log('3. Ensure the password "Vishal4624" is correct');
console.log('4. Verify the database "ryse_wears" exists');
console.log('5. Check if your IP address is whitelisted in MongoDB Atlas');
console.log('');

console.log('Quick Fix Options:');
console.log('Option 1: Update .env file with correct credentials');
console.log('Option 2: Create a new MongoDB user with proper permissions');
console.log('Option 3: Use a different database connection string');
console.log('');

console.log('To fix immediately:');
console.log('1. Go to MongoDB Atlas dashboard');
console.log('2. Navigate to Database Access section');
console.log('3. Verify or create user "kumaradik37_db_user" with password "Vishal4624"');
console.log('4. Ensure the user has "Read and write to any database" permissions');
console.log('5. Add your current IP address to the IP whitelist');
console.log('');

console.log('For deployment to Vercel:');
console.log('1. You can still deploy even with MongoDB issues');
console.log('2. The frontend will work with mock data');
console.log('3. Set MONGODB_URL environment variable in Vercel dashboard');
console.log('4. Vercel will use the environment variable at runtime');

// Let's try to connect with more detailed error handling
const testConnection = async () => {
  try {
    console.log('\nTesting connection with detailed options...');
    
    // Try connecting with more specific options
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB Connected successfully!');
    await mongoose.connection.close();
  } catch (error) {
    console.log('Connection failed with detailed options:', error.message);
  }
};

testConnection();