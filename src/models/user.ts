// @ts-ignore
import pool from '../utils/database'

export type User = {
    id?: number
    firstName: string
    lastName: string
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
                'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const connection = await pool.connect()
            const result = await connection.query(sql, [
                u.firstName,
                u.lastName,
                u.password_digest,
            ])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Could not add new user ${u.firstName}. Error: ${err}`
            )
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
