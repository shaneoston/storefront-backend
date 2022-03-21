CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    price money DEFAULT 0.00,
    category varchar(50)
)