# RYSE Wears

A modern fashion e-commerce platform built with a headless architecture featuring real products, payment integration, and a complete shopping experience.

## 🎯 Project Overview

RYSE Wears is a full-featured e-commerce solution designed for the fashion industry. It includes product browsing, cart management, user authentication, admin dashboard, and secure payment processing through Razorpay. The platform is optimized for the Indian market with support for Indian Rupees (₹), GST calculations, and local payment methods.

## 🏛️ Core Architecture: Headless Approach

This project follows a headless architecture where the frontend (storefront) and backend (API) are completely separate, allowing for maximum flexibility and scalability.

## 💻 Technology Stack

### Frontend (Storefront)
- **Framework**: Next.js (React) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **Deployment**: Vercel

### Backend (API)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Processing**: Razorpay (Indian Market)
- **Deployment**: Render

## 🌟 Key Features

- ✅ **Product Management**: Browse, search, and filter fashion products
- ✅ **Shopping Cart**: Add/remove items, adjust quantities
- ✅ **Product Details**: Size/color selection, quantity control
- ✅ **User Authentication**: Login/register with JWT
- ✅ **Admin Dashboard**: Manage products, categories, orders
- ✅ **Payment Integration**: Secure payments with Razorpay
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **Dark Mode**: Toggle between light/dark themes
- ✅ **SEO Optimized**: Proper meta tags and structured data

## 🗺️ Project Structure

```
/RYSE-wears
│
├── 📁 /frontend
│   ├── /app         (Pages: home, products, cart, login, register, admin, dashboard)
│   ├── /components   (Reusable UI components)
│   ├── /context      (State management)
│   ├── /services     (API service functions)
│   └── README.md     (Frontend documentation)
│
└── 📁 /backend
    ├── /routes       (API endpoints)
    ├── /controllers  (Business logic)
    ├── /models       (Database models)
    ├── /middleware   (Custom middleware)
    ├── /config       (Configuration files)
    ├── server.js     (Main server file)
    └── README.md     (Backend documentation)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database (local or Atlas)
- npm or yarn

### Setup

1. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   # Runs on http://localhost:3000
   ```
   
2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Set up your MongoDB database
   # Update the .env file with your database credentials
   npm run dev
   # Runs on http://localhost:5000
   ```

## 🛠️ Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=mongodb://localhost:27017/ryse_wears
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 📚 Documentation

For detailed documentation, please refer to:
- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import repository in Vercel
3. Set environment variables
4. Deploy

### Backend (Render)
1. Push to GitHub
2. Create new Web Service in Render
3. Connect repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.