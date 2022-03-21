CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     first_name VARCHAR(100),
     last_name VARCHAR(100) NOT NULL,
     password_digest VARCHAR
)