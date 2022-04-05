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
            const { product_id, quantity, user_id, status } = req.query

            if (!product_id || !quantity || !user_id || !status) {
                return res.status(400).json({
                    error: 'Missing one or more required parameters',
                })
            }

            const order = await store.createOrder({
                product_id: parseInt(product_id as string),
                quantity: parseInt(quantity as string),
                user_id: parseInt(user_id as string),
                status: product_id as string,
            })
            res.status(201).json(order)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async updateOrder(req: express.Request, res: express.Response) {
        try {
            const { product_id, quantity, user_id, status } = req.query
            const id = req.params.id

            if (!id || !product_id || !quantity || !user_id || !status) {
                return res.status(400).json({
                    error: 'Missing one or more required parameters',
                })
            }

            const order = await store.updateOrder({
                id: parseInt(req.params.id as string),
                product_id: parseInt(product_id as string),
                quantity: parseInt(quantity as string),
                user_id: parseInt(user_id as string),
                status: product_id as string,
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
