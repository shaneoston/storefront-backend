// @ts-ignore
import pool from '../utils/database'
import { Order, ProductToOrder } from '../interfaces/order.interface'

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
                'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const connection = await pool.connect()

            const result = await connection.query(sql, [o.user_id, o.status])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`)
        }
    }

    async updateOrder(o: Order): Promise<Order> {
        try {
            const sql = `UPDATE orders SET user_id = $2, status = $3 WHERE id = $1 RETURNING *`
            // @ts-ignore
            const connection = await pool.connect()

            const result = await connection.query(sql, [
                o.id,
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
                         WHERE user_id = ($1);`
            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(
                `Could not get orders for user ${id}. Error: ${err}`
            )
        }
    }

    async addProductToOrder(p: ProductToOrder): Promise<ProductToOrder> {
        try {
            const sql =
                'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const connection = await pool.connect()

            const result = await connection.query(sql, [
                p.order_id,
                p.product_id,
                p.quantity,
            ])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add product. Error: ${err}`)
        }
    }
}
