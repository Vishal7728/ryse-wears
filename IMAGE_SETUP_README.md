# RYSE Wears Western Products Image Setup

## 📁 Folder Structure

All product images should be placed in the following directories:

```
frontend/
└── public/
    └── images/
        └── products/
            ├── male/
            ├── female/
            └── accessories/
```

## 🖼️ Image Requirements

- Format: JPG
- Size: 800x1000 pixels recommended
- File size: Under 2MB for optimal loading
- Naming: Use lowercase with hyphens (e.g., `classic-white-tshirt.jpg`)

## 🔗 How Images Link to Backend

1. **Local Development**: Images are served from the `public` folder at paths like:
   - `/images/products/male/classic-white-tshirt.jpg`
   - `/images/products/female/off-shoulder-top.jpg`
   - `/images/products/accessories/leather-crossbody-bag.jpg`

2. **Database Storage**: Product documents in MongoDB store the image path in the `image` field

3. **Frontend Display**: Next.js Image component loads images from the public folder

4. **Vercel Deployment**: Images in the `public` folder are automatically served at the root path

## 🔄 Setup Process

1. Place your product images in the appropriate folders with exact names
2. Run the database setup script: `node createWesternProducts.js`
3. Start backend: `npm start` (in backend folder)
4. Start frontend: `npm run dev` (in frontend folder)

## 🧪 Testing

Visit `/test-images` route to preview all product images and verify paths are correct.

## 🚀 Deployment

When deploying to Vercel:
- Everything in the `public` folder is automatically served
- No additional configuration needed for images
- Database connects via `MONGODB_URL` environment variable
- Frontend connects to backend via `NEXT_PUBLIC_API_URL` environment variable