import express from 'express'
import { OrderStore } from '../models/order'

const store = new OrderStore()

export default class OrdersController {
    async getOrders(_req: express.Request, res: express.Response) {
        try {
            const orders = await store.getOrders()
            res.status(200).json(orders)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOrderById(req: express.Request, res: express.Response) {
        try {
            const order = await store.getOrderById(parseInt(req.params.id))
            res.status(200).json(order)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async createOrder(req: express.Request, res: express.Response) {
        try {
            const { user_id, status } = req.body

            if (!user_id || !status) {
                return res.status(400).json({
                    error: 'Missing one or more required parameters',
                })
            }

            const order = await store.createOrder({
                user_id: parseInt(user_id as string),
                status: status as string,
            })

            res.status(201).json(order)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async addProductToOrder(req: express.Request, res: express.Response) {
        try {
            const order_id = parseInt(req.params.id)
            const product_id = parseInt(req.body.product_id as string)
            const quantity = parseInt(req.body.quantity as string)

            if (!order_id || !product_id || !quantity) {
                return res.status(400).json({
                    error: 'Missing one or more required parameters',
                })
            }

            const product = await store.addProductToOrder({
                order_id,
                product_id,
                quantity,
            })

            res.status(200).json(product)
        } catch (e) {}
    }

    async updateOrder(req: express.Request, res: express.Response) {
        try {
            const { user_id, status } = req.body
            const id = req.params.id

            if (!id || !user_id || !status) {
                return res.status(400).json({
                    error: 'Missing one or more required parameters',
                })
            }

            const order = await store.updateOrder({
                id: parseInt(req.params.id as string),
                user_id: parseInt(user_id as string),
                status: status as string,
            })
            res.status(201).json(order)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async deleteOrder(req: express.Request, res: express.Response) {
        try {
            await store.deleteOrder(parseInt(req.params.id as string))
            res.status(200).json({ status: `Deleted order ${req.params.id}` })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getCurrentOrders(req: express.Request, res: express.Response) {
        try {
            const currentOrders = await store.getCurrentOrders(
                parseInt(req.params.id as string)
            )
            res.status(200).json(currentOrders)
        } catch (e) {
            res.status(400).json(e)
        }
    }
}
