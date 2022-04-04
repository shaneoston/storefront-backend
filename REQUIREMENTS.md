# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create [token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
The table includes the following fields: 
- id
- name
- price
- category
The SQL schema for this table is as follows: 
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    price numeric DEFAULT 0.00,
    category varchar(50)
)
```

#### User
The table includes the following fields:
- id
- username
- firstName
- lastName
- password
The SQL schema for this table is as follows:
```sql
CREATE TABLE "users" (
     id SERIAL PRIMARY KEY,
     username VARCHAR,
     first_name VARCHAR(100),
     last_name VARCHAR(100),
     password_digest VARCHAR
)
```

#### Orders
The table includes the following fields:
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
The SQL schema for this table is as follows:
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id int NOT NULL,
    quantity int NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(8) NOT NULL,
    CONSTRAINT fk_orders_users
        FOREIGN KEY (user_id)
            REFERENCES users(id),
    CONSTRAINT fk_orders_products
        FOREIGN KEY (product_id)
            REFERENCES products(id)
);
```