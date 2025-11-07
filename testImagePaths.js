const fs = require('fs');
const path = require('path');

// Define the base path for product images
const basePath = path.join(__dirname, 'frontend', 'public', 'images', 'products');

// Western products image paths
const productImages = [
  // Male Products
  'male/classic-white-tshirt.jpg',
  'male/slim-fit-jeans.jpg',
  'male/black-leather-jacket.jpg',
  'male/casual-plaid-shirt.jpg',
  'male/navy-blue-chinos.jpg',
  'male/hooded-sweatshirt.jpg',
  'male/polo-shirt.jpg',
  'male/cargo-pants.jpg',
  'male/denim-jacket.jpg',
  'male/graphic-tee.jpg',
  'male/athletic-joggers.jpg',
  'male/bomber-jacket.jpg',
  'male/oxford-shirt.jpg',
  'male/shorts.jpg',
  'male/blazer.jpg',
  'male/tank-top.jpg',
  'male/track-pants.jpg',
  'male/trench-coat.jpg',
  'male/flannel-shirt.jpg',
  'male/ripped-jeans.jpg',
  'male/varsity-jacket.jpg',
  'male/henley-shirt.jpg',
  'male/khaki-pants.jpg',
  'male/overcoat.jpg',
  'male/button-down-shirt.jpg',

  // Female Products
  'female/off-shoulder-top.jpg',
  'female/high-waisted-jeans.jpg',
  'female/leather-moto-jacket.jpg',
  'female/floral-dress.jpg',
  'female/mom-jeans.jpg',
  'female/crop-hoodie.jpg',
  'female/wrap-top.jpg',
  'female/mini-skirt.jpg',
  'female/trench-dress.jpg',
  'female/boyfriend-jeans.jpg',
  'female/faux-fur-coat.jpg',
  'female/bodysuit.jpg',
  'female/maxi-skirt.jpg',
  'female/slip-dress.jpg',
  'female/wide-leg-pants.jpg',
  'female/kimono-cardigan.jpg',
  'female/tube-top.jpg',
  'female/leather-pants.jpg',
  'female/midi-dress.jpg',
  'female/paperbag-waist-pants.jpg',
  'female/puffer-jacket.jpg',
  'female/cold-shoulder-top.jpg',
  'female/culottes.jpg',
  'female/bodycon-dress.jpg',
  'female/palazzo-pants.jpg',

  // Accessories
  'accessories/leather-crossbody-bag.jpg',
  'accessories/baseball-cap.jpg',
  'accessories/sneakers.jpg',
  'accessories/tote-bag.jpg',
  'accessories/beanie.jpg',
  'accessories/ankle-boots.jpg',
  'accessories/backpack.jpg',
  'accessories/fedora-hat.jpg',
  'accessories/running-shoes.jpg',
  'accessories/clutch-bag.jpg',
  'accessories/sun-hat.jpg',
  'accessories/loafers.jpg'
];

console.log('RYSE Wears - Image Path Verification\n');
console.log('====================================\n');

let missingImages = [];
let foundImages = 0;

productImages.forEach(imagePath => {
  const fullPath = path.join(basePath, imagePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ Found: ${imagePath}`);
    foundImages++;
  } else {
    console.log(`✗ Missing: ${imagePath}`);
    missingImages.push(imagePath);
  }
});

console.log('\n====================================\n');
console.log(`Summary:`);
console.log(`- Found: ${foundImages} images`);
console.log(`- Missing: ${missingImages.length} images`);

if (missingImages.length > 0) {
  console.log('\nMissing images:');
  missingImages.forEach(image => {
    console.log(`  - ${image}`);
  });
  
  console.log('\nPlease place the missing images in the appropriate folders.');
} else {
  console.log('\n🎉 All images are in place! Ready for deployment.');
}

console.log('\nFolders to check:');
console.log(`- ${path.join(basePath, 'male')}`);
console.log(`- ${path.join(basePath, 'female')}`);
console.log(`- ${path.join(basePath, 'accessories')}`);