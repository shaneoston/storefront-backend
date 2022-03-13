import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
    POSTGRES_HOST,
    DEV_POSTGRES_DB,
    TEST_POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
} = process.env

let pool
console.log(ENV)

if (ENV === 'test') {
    pool = new Pool({
        host: POSTGRES_HOST,
        database: TEST_POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

if (ENV === 'dev') {
    pool = new Pool({
        host: POSTGRES_HOST,
        database: DEV_POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

export default pool
