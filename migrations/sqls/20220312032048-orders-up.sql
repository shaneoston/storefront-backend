CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id int NOT NULL,
    quantity int NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(8) NOT NULL
);