const fs = require('fs');
const https = require('https');
const path = require('path');
const { URL } = require('url');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'product-images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Product images to download
const products = [
  {
    id: '1',
    name: 'Designer Silk Saree',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop'
  },
  {
    id: '2',
    name: 'Banarasi Silk Saree',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=800&h=1000&fit=crop'
  },
  {
    id: '3',
    name: 'Anarkali Suit',
    imageUrl: 'https://images.unsplash.com/photo-1614095851165-d3e4b7e70b85?w=800&h=1000&fit=crop'
  },
  {
    id: '4',
    name: 'Punjabi Suit',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&h=1000&fit=crop'
  },
  {
    id: '5',
    name: 'Lehenga Choli',
    imageUrl: 'https://images.unsplash.com/photo-1595341595155-9f8cd95d3e5f?w=800&h=1000&fit=crop'
  },
  {
    id: '6',
    name: 'Kurta Pajama Set',
    imageUrl: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=800&h=1000&fit=crop'
  },
  {
    id: '7',
    name: 'Sherwani',
    imageUrl: 'https://images.unsplash.com/photo-1606219592522-af678b8e0c8e?w=800&h=1000&fit=crop'
  },
  {
    id: '8',
    name: 'Nehru Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&h=1000&fit=crop'
  }
];

// Function to download an image
const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    
    // Parse the URL to handle query parameters properly
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    
    const file = fs.createWriteStream(filePath);
    
    const request = https.get(options, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${filename}`);
          resolve(filePath);
        });
      } else {
        fs.unlink(filePath, () => {}); // Delete the file async
        reject(new Error(`Failed to download ${filename}: ${response.statusCode} ${response.statusMessage}`));
      }
    });
    
    request.on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file async
      reject(err);
    });
  });
};

// Download all images
const downloadAllImages = async () => {
  console.log('Downloading product images...\n');
  
  for (const product of products) {
    try {
      const filename = `product-${product.id}-${product.name.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      await downloadImage(product.imageUrl, filename);
    } catch (error) {
      console.error(`✗ Error downloading ${product.name}: ${error.message}`);
    }
  }
  
  console.log('\nAll images downloaded to:', imagesDir);
  console.log('\nCurrent image URLs being used:');
  products.forEach(product => {
    console.log(`${product.id}. ${product.name}: ${product.imageUrl}`);
  });
  
  console.log('\nInstructions:');
  console.log('1. You can now replace these images with your own local images.');
  console.log('2. After replacing, upload them to your image hosting service.');
  console.log('3. Update the image URLs in the frontend code with your new image URLs.');
  console.log('4. For Vercel deployment, you can also place images in the public folder.');
};

downloadAllImages();