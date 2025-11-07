# RYSE Wears - Deployment Fixes

This document outlines the fixes implemented to resolve the image loading and dark mode performance issues.

## Issues Fixed

### 1. Image Loading Issue on Homepage

**Problem**: Product images were not loading on the homepage when deployed to Vercel, but worked fine in the product section.

**Root Cause**: 
- The backend was not serving static files from the frontend's public directory
- Image paths were relative and not resolving correctly in the production environment

**Solution**:
1. Modified `backend/server.js` to serve static files:
   ```javascript
   app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));
   ```

2. Modified `backend/api/index.js` for Vercel deployment:
   ```javascript
   app.use('/images', express.static(path.join(__dirname, '../../frontend/public/images')));
   ```

3. Updated `backend/vercel.json` to route image requests:
   ```json
   {
     "src": "/images/(.*)",
     "dest": "/../frontend/public/images/$1"
   }
   ```

### 2. Dark Mode Performance Lag

**Problem**: The website was lagging in dark mode but working fine in light mode.

**Root Cause**: 
- Complex CSS animations and effects in the dark mode pattern overlay
- Too many DOM elements and animations causing performance issues

**Solution**:
1. Simplified `DarkModePattern.tsx` component:
   - Removed complex particle animations
   - Removed 3D cube animations
   - Removed glowing orb effects
   - Removed geometric shapes
   - Removed animated grid patterns

2. Optimized `globals.css`:
   - Simplified dark mode background to a single gradient
   - Reduced animation durations
   - Added mobile-specific optimizations
   - Disabled complex animations on mobile devices
   - Reduced transition durations for better performance

3. Added performance optimizations:
   - Media queries for low-end devices
   - Disabled non-essential animations on mobile
   - Simplified hover effects
   - Reduced image loading complexity

## Deployment Steps

### 1. Backend Deployment (Vercel)

1. Deploy the backend first to get the live URL
2. Make sure the `vercel.json` file is in the backend directory
3. Set environment variables in Vercel:
   - `MONGODB_URL` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret
   - `RAZORPAY_KEY_ID` - Your Razorpay key ID
   - `RAZORPAY_KEY_SECRET` - Your Razorpay key secret

### 2. Frontend Deployment (Vercel)

1. Update `.env` file with the production backend URL:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
   ```

2. Deploy the frontend to Vercel
3. Make sure the `vercel.json` file is in the frontend directory

### 3. Image Optimization

The images are now properly served from the frontend's public directory with:
- Proper caching headers
- Optimized Next.js image component settings
- Lazy loading enabled by default

## Testing

To verify the fixes work:

1. Run the backend locally:
   ```bash
   cd backend
   npm run dev
   ```

2. Run the frontend locally:
   ```bash
   cd frontend
   npm run dev
   ```

3. Check that images load correctly on both homepage and product pages
4. Verify that dark mode performance is improved

## Additional Notes

- All changes maintain the visual design while improving performance
- Mobile devices will have simplified animations for better performance
- Image loading has been optimized with lazy loading and proper caching
- The dark mode background is now a simple gradient instead of complex animations