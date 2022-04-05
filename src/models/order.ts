// @ts-ignore
import pool from '../utils/database'
import Order from '../interfaces/order.interface'

export class OrderStore {
    async getOrders(): Promise<Order[]> {
        try {
            // @ts-ignore
            const connection = await pool.connect()
            const sql = 'SELECT * FROM orders'

            const result = await connection.query(sql)
            connection.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async getOrderById(id: number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            // @ts-ignore
            const connection = await pool.connect()

            const result = await connection.query(sql, [id])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async createOrder(o: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
            const connection = await pool.connect()

            const result = await connection.query(sql, [
                o.product_id,
                o.quantity,
                o.user_id,
                o.status,
            ])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`)
        }
    }

    async updateOrder(o: Order): Promise<Order> {
        try {
            const sql = `UPDATE orders SET quantity = $2, product_id = $3, user_id = $4, status = $5 WHERE id = $1 RETURNING *`
            // @ts-ignore
            const connection = await pool.connect()
            const result = await connection.query(sql, [
                o.id,
                o.quantity,
                o.product_id,
                o.user_id,
                o.status,
            ])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not update order ${o.id}. Error: ${err}`)
        }
    }

    async deleteOrder(id: number): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await pool.connect()
            const sql = 'DELETE FROM products WHERE id=($1)'

            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

    async getCurrentOrders(id: number) {
        try {
            // @ts-ignore
            const conn = await pool.connect()
            const sql = `SELECT *
                         FROM orders
                         WHERE user_id = ($1)
                           AND NOT status = 'complete';`
            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(
                `Could not get orders for user ${id}. Error: ${err}`
            )
        }
    }
}
