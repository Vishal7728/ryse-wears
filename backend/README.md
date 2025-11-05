# RYSE Wears - Backend

This is the backend API for the RYSE Wears fashion e-commerce website, built with Node.js, Express, and PostgreSQL.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **Deployment**: Render or similar cloud platform

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

The server will start on [http://localhost:5000](http://localhost:5000).

## Project Structure

- `server.js` - Main server file
- `routes/` - API route definitions
- `controllers/` - Business logic for each route
- `models/` - Database models
- `middleware/` - Custom middleware functions
- `config/` - Configuration files
- `database.sql` - Database schema and initial data

## Available Scripts

- `npm run dev` - Runs the server in development mode with nodemon
- `npm start` - Runs the server in production mode
- `npm test` - Runs the test suite (if available)

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Admin
- `GET /api/admin/dashboard/analytics` - Get sales analytics
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create new category
- `GET /api/admin/orders` - Get all orders

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=your_postgresql_connection_string
```

## Database Setup

1. Create a PostgreSQL database
2. Run the SQL script in `config/database.sql` to set up tables and initial data

## Learn More

To learn more about the technologies used in this project:

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Documentation](https://jwt.io/introduction/)