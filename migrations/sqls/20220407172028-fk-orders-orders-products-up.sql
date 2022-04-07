ALTER TABLE order_products
    ADD CONSTRAINT fk_orders_order_products
        FOREIGN KEY (order_id)
            REFERENCES orders(id);