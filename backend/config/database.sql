-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'user', -- 'user' or 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    permissions TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create product categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category_id INTEGER REFERENCES categories(id),
    subcategory VARCHAR(100), -- e.g., 'Casual', 'Formal'
    gender VARCHAR(20), -- 'Men', 'Women', 'Unisex'
    size VARCHAR(50),
    color VARCHAR(50),
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    shipping_address TEXT,
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Create user_requests table for storing user inquiries
CREATE TABLE IF NOT EXISTS user_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'resolved', 'closed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create analytics table for storing purchase data
CREATE TABLE IF NOT EXISTS purchase_analytics (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    category_id INTEGER REFERENCES categories(id),
    user_id INTEGER REFERENCES users(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    gender VARCHAR(20),
    subcategory VARCHAR(100),
    purchase_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
    ('Tops', 'Shirts, blouses, and tops'),
    ('Bottoms', 'Pants, jeans, and skirts'),
    ('Dresses', 'Dresses and gowns'),
    ('Outerwear', 'Jackets, coats, and hoodies'),
    ('Accessories', 'Bags, scarves, and jewelry');

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category_id, subcategory, gender, size, color, stock_quantity) VALUES
    ('Summer Collection T-Shirt', 'Comfortable cotton t-shirt for everyday wear', 29.99, '/images/tshirt.jpg', 1, 'Casual', 'Unisex', 'M', 'Black', 50),
    ('Designer Jeans', 'Slim fit designer jeans with premium finish', 79.99, '/images/jeans.jpg', 2, 'Casual', 'Men', '32', 'Blue', 30),
    ('Casual Hoodie', 'Soft fleece hoodie for casual outings', 49.99, '/images/hoodie.jpg', 4, 'Casual', 'Women', 'L', 'Grey', 25),
    ('Summer Shorts', 'Lightweight shorts perfect for summer', 34.99, '/images/shorts.jpg', 2, 'Casual', 'Men', '34', 'Khaki', 40),
    ('Formal Blouse', 'Elegant blouse for formal occasions', 59.99, '/images/blouse.jpg', 1, 'Formal', 'Women', 'S', 'White', 20);

-- Insert admin user (password is 'admin123' hashed)
INSERT INTO users (email, password, first_name, last_name, role) VALUES 
    ('admin@rysewears.com', '$2b$10$rOzJqQZ8QxN.8v/PVu9stez/NF.C3fhYWdE2d.GQDQTlB/2b.P/mG', 'Admin', 'User', 'admin');