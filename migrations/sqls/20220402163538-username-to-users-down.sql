ALTER TABLE users
    DROP COLUMN username,
    ALTER COLUMN last_name SET NOT NULL;