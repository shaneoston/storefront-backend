ALTER TABLE orders
    ADD CONSTRAINT fk_orders_users
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;