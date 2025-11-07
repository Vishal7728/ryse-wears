const fs = require('fs');
const path = require('path');

console.log('RYSE Wears - MongoDB Credentials Reset');
console.log('====================================\n');

const envPath = path.join(__dirname, '.env');

let envContent = fs.readFileSync(envPath, 'utf8');

console.log('Current MongoDB Configuration:');
console.log('=============================');

const mongoMatch = envContent.match(/MONGODB_URL=(.*)/);
if (mongoMatch) {
  const mongoUrl = mongoMatch[1];
  console.log(`MONGODB_URL=${mongoUrl}`);
  
  try {
    const url = new URL(mongoUrl);
    console.log('\nParsed Connection Details:');
    console.log('- Host:', url.hostname);
    console.log('- Database:', url.pathname.substring(1));
    console.log('- Username:', url.username);
    console.log('- Password: ********');
    
    console.log('\n🔧 How to Fix Authentication Issues:');
    console.log('====================================');
    console.log('1. Go to MongoDB Atlas: https://cloud.mongodb.com');
    console.log('2. Navigate to "Database Access" in the left sidebar');
    console.log('3. Find user:', url.username);
    console.log('4. If user exists:');
    console.log('   - Click "Edit" (pencil icon)');
    console.log('   - Verify the password is:', url.password);
    console.log('   - Ensure user has "Read and write to any database" permissions');
    console.log('   - Click "Update User"');
    console.log('5. If user does not exist:');
    console.log('   - Click "Add New Database User"');
    console.log('   - Set Username:', url.username);
    console.log('   - Set Password:', url.password);
    console.log('   - Select "Password" for authentication method');
    console.log('   - Set User Privileges to "Read and write to any database"');
    console.log('   - Click "Add User"');
    
    console.log('\n🌐 Network Access:');
    console.log('==================');
    console.log('1. Navigate to "Network Access" in the left sidebar');
    console.log('2. Click "Add IP Address"');
    console.log('3. Add your current IP:', '157.48.92.47');
    console.log('   - Or add 0.0.0.0/0 to allow all IPs (less secure)');
    console.log('4. Add a comment like "Development Machine"');
    console.log('5. Click "Confirm"');
    
    console.log('\n🔄 After making changes:');
    console.log('========================');
    console.log('1. Wait 1-2 minutes for changes to propagate');
    console.log('2. Run: node testDbConnection.js');
    console.log('3. If successful, run: node createWesternProducts.js');
    
  } catch (error) {
    console.log('Could not parse MongoDB URL:', error.message);
  }
} else {
  console.log('MONGODB_URL not found in .env file');
}

console.log('\n📝 Note: For deployment, you can still deploy to Vercel');
console.log('   The frontend works with mock data until MongoDB is fixed');