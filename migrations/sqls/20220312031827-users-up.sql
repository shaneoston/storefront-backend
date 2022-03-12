CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100) NOT NULL,
    password_digest VARCHAR
)