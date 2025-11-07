const fs = require('fs');
const path = require('path');

// Define the base path for product images
const basePath = path.join(__dirname, 'frontend', 'public', 'images', 'products');

// Male product image names
const maleImages = [
  'classic-white-tshirt.jpg',
  'slim-fit-jeans.jpg',
  'black-leather-jacket.jpg',
  'casual-plaid-shirt.jpg',
  'navy-blue-chinos.jpg',
  'hooded-sweatshirt.jpg',
  'polo-shirt.jpg',
  'cargo-pants.jpg',
  'denim-jacket.jpg',
  'graphic-tee.jpg',
  'athletic-joggers.jpg',
  'bomber-jacket.jpg',
  'oxford-shirt.jpg',
  'shorts.jpg',
  'blazer.jpg',
  'tank-top.jpg',
  'track-pants.jpg',
  'trench-coat.jpg',
  'flannel-shirt.jpg',
  'ripped-jeans.jpg',
  'varsity-jacket.jpg',
  'henley-shirt.jpg',
  'khaki-pants.jpg',
  'overcoat.jpg',
  'button-down-shirt.jpg'
];

// Female product image names
const femaleImages = [
  'off-shoulder-top.jpg',
  'high-waisted-jeans.jpg',
  'leather-moto-jacket.jpg',
  'floral-dress.jpg',
  'mom-jeans.jpg',
  'crop-hoodie.jpg',
  'wrap-top.jpg',
  'mini-skirt.jpg',
  'trench-dress.jpg',
  'boyfriend-jeans.jpg',
  'faux-fur-coat.jpg',
  'bodysuit.jpg',
  'maxi-skirt.jpg',
  'slip-dress.jpg',
  'wide-leg-pants.jpg',
  'kimono-cardigan.jpg',
  'tube-top.jpg',
  'leather-pants.jpg',
  'midi-dress.jpg',
  'paperbag-waist-pants.jpg',
  'puffer-jacket.jpg',
  'cold-shoulder-top.jpg',
  'culottes.jpg',
  'bodycon-dress.jpg',
  'palazzo-pants.jpg'
];

// Accessories image names
const accessoriesImages = [
  'leather-crossbody-bag.jpg',
  'baseball-cap.jpg',
  'sneakers.jpg',
  'tote-bag.jpg',
  'beanie.jpg',
  'ankle-boots.jpg',
  'backpack.jpg',
  'fedora-hat.jpg',
  'running-shoes.jpg',
  'clutch-bag.jpg',
  'sun-hat.jpg',
  'loafers.jpg'
];

// Function to rename images in a directory
function renameImagesInDir(dirPath, imageNames) {
  try {
    const files = fs.readdirSync(dirPath);
    console.log(`\nRenaming images in ${dirPath}:`);
    
    // Filter out only image files
    const imageFiles = files.filter(file => 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') || 
      file.toLowerCase().endsWith('.png')
    );
    
    // Sort files to ensure consistent ordering
    imageFiles.sort();
    
    // Rename files
    for (let i = 0; i < Math.min(imageFiles.length, imageNames.length); i++) {
      const oldPath = path.join(dirPath, imageFiles[i]);
      const newPath = path.join(dirPath, imageNames[i]);
      
      // Only rename if the new name is different
      if (imageFiles[i] !== imageNames[i]) {
        fs.renameSync(oldPath, newPath);
        console.log(`  Renamed: ${imageFiles[i]} → ${imageNames[i]}`);
      } else {
        console.log(`  Already named correctly: ${imageFiles[i]}`);
      }
    }
    
    console.log(`  Processed ${Math.min(imageFiles.length, imageNames.length)} images`);
  } catch (error) {
    console.error(`Error renaming images in ${dirPath}:`, error.message);
  }
}

console.log('RYSE Wears - Image Renaming Script');
console.log('==================================');

// Rename images in each directory
renameImagesInDir(path.join(basePath, 'male'), maleImages);
renameImagesInDir(path.join(basePath, 'female'), femaleImages);
renameImagesInDir(path.join(basePath, 'accessories'), accessoriesImages);

console.log('\n✅ Image renaming complete!');
console.log('\nNext steps:');
console.log('1. Run the database setup script: node backend/createWesternProducts.js');
console.log('2. Start your servers:');
console.log('   - Backend: cd backend && npm start');
console.log('   - Frontend: cd frontend && npm run dev');