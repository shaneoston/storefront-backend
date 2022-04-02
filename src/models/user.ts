// @ts-ignore
import pool from '../utils/database'
import bcrypt from 'bcrypt'
import User from '../interfaces/user.interface'

const pepper = process.env.BCRYPT_PASSWORD as string
const saltRounds = process.env.SALT_ROUNDS as string

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
            // @ts-ignore
            const connection = await pool.connect()
            const sql =
                'INSERT INTO users (username, first_name, last_name, password_digest) VALUES($1, $2, $3, $4) RETURNING *'
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            )

            const result = await connection.query(sql, [
                u.username,
                u.first_name,
                u.last_name,
                hash,
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
            // @ts-ignore
            const connection = await pool.connect()
            const sql = `UPDATE users SET username = $2, first_name = $3, last_name = $4, password_digest = $5 WHERE id = $1 RETURNING *`
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            )

            const result = await connection.query(sql, [
                u.id,
                u.username,
                u.first_name,
                u.last_name,
                hash,
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

    async authenticate(
        username: string,
        password: string
    ): Promise<User | null> {
        // @ts-ignore
        const conn = await pool.connect()
        const sql = 'SELECT password_digest FROM users WHERE username=($1)'

        const result = await conn.query(sql, [username])

        console.log(password + pepper)

        if (result.rows.length) {
            const user = result.rows[0]
            console.log(user)
            if (bcrypt.compareSync(password + pepper, user.password_digest)) {
                return user
            }
        }

        return null
    }
}
