ALTER TABLE orders
    ADD CONSTRAINT fk_orders_products
        FOREIGN KEY (product_id)
            REFERENCES products(id);