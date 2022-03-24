// @ts-ignore
import pool from '../utils/database'

export type User = {
    id?: number
    first_name: string
    last_name: string
    password_digest: string
}

export class UserStore {
    async getUsers(): Promise<User[]> {
        try {
            // @ts-ignore
            const connection = await pool.connect()
            const sql = 'SELECT * FROM users'
            const result = await connection.query(sql)
            connection.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            // @ts-ignore
            const connection = await pool.connect()
            const result = await connection.query(sql, [id])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

    async createUser(u: User): Promise<User> {
        try {
            const sql =
                'INSERT INTO users (first_name, last_name, password_digest) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const connection = await pool.connect()
            const result = await connection.query(sql, [
                u.first_name,
                u.last_name,
                u.password_digest,
            ])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Could not add new user ${u.first_name}. Error: ${err}`
            )
        }
    }

    async updateUser(u: User): Promise<User> {
        try {
            const sql = `UPDATE users SET first_name = $2, last_name = $3, password_digest = $4 WHERE id = $1 RETURNING *`
            // @ts-ignore
            const connection = await pool.connect()
            const result = await connection.query(sql, [
                u.id,
                u.first_name,
                u.last_name,
                u.password_digest,
            ])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not update user ${u.id}. Error: ${err}`)
        }
    }

    async deleteUser(id: number): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)'
            // @ts-ignore
            const connection = await pool.connect()
            const result = await connection.query(sql, [id])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }
}
