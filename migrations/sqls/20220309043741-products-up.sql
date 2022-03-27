CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    price float(2) DEFAULT 0.00,
    category varchar(50)
)