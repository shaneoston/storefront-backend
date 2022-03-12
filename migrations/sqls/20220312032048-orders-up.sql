CREATE TABLE "orders" (
    id SERIAL PRIMARY KEY,
    product_id int NOT NULL,
    quantity int NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(8) NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id),
    CONSTRAINT fk_product
        FOREIGN KEY(product_id)
            REFERENCES products(id)
);