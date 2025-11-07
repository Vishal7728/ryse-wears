const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGODB_URL:', process.env.MONGODB_URL ? 'SET' : 'NOT SET');
    
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB Connected successfully!');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('Error code:', error.code);
    console.error('Error name:', error.name);
    
    console.log('\n🔧 Troubleshooting Steps:');
    console.log('1. Check if your IP (157.48.92.47) is whitelisted in MongoDB Atlas');
    console.log('2. Verify username: kumaradik37_db_user');
    console.log('3. Verify password: Vishal4624');
    console.log('4. Check if the database "ryse_wears" exists');
    console.log('5. Ensure user has "Read and write to any database" permissions');
    
    console.log('\n🌐 To whitelist your IP:');
    console.log('1. Go to https://cloud.mongodb.com');
    console.log('2. Navigate to Network Access > Add IP Address');
    console.log('3. Add: 157.48.92.47');
    console.log('4. Or add 0.0.0.0/0 to allow all IPs (less secure)');
    
    process.exit(1);
  }
};

testConnection();