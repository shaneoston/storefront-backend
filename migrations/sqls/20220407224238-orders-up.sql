CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    status varchar NOT NULL,
    CONSTRAINT fk_orders_users
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);