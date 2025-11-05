# RYSE Wears

A modern fashion e-commerce website built with a headless architecture.

## 🏛️ Core Architecture: Headless Approach

This project follows a headless architecture where the frontend (storefront) and backend (API) are completely separate, allowing for maximum flexibility and scalability.

## 💻 Technology Stack

### Frontend (Storefront)
- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Deployment**: Vercel

### Backend (API)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Render/Supabase

## 🗺️ Project Structure

```
/fashion-project
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
- PostgreSQL database
- npm or yarn

### Setup

1. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   
2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Set up your PostgreSQL database
   # Update the .env file with your database credentials
   npm run dev
   ```

## 📚 Documentation

For detailed documentation, please refer to:
- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.