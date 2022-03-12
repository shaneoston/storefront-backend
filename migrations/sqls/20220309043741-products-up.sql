CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price decimal(7,2) DEFAULT 0.00,
    category varchar(50)
)