import express from 'express'
import { ProductStore } from '../models/product'

const store = new ProductStore()

export default class ProductsController {
    async getProducts(_req: express.Request, res: express.Response) {
        try {
            const products = await store.getProducts()
            res.status(200).json(products)
        } catch (e) {
            res.status(500)
            res.json(e)
        }
    }

    async getProductsById(req: express.Request, res: express.Response) {
        try {
            const product = await store.getProductById(parseInt(req.params.id))
            res.status(200).json(product)
        } catch (e) {
            res.status(500)
            res.json(e)
        }
    }

    async createProduct(req: express.Request, res: express.Response) {
        try {
            if (!req.query.name) {
                return res.status(400).json({
                    error: 'Product name is required',
                })
            }
            const product = await store.createProduct({
                name: req.query.name as string,
                price: parseFloat(req.query.price as string),
                category: req.query.category as string,
            })
            res.status(201).json(product)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updateProduct(req: express.Request, res: express.Response) {
        try {
            if (!req.query.name) {
                return res.status(400).json({
                    error: 'Product name is required',
                })
            }
            const product = await store.updateProduct({
                id: parseInt(req.params.id as string),
                name: req.query.name as string,
                price: parseFloat(req.query.price as string),
                category: req.query.category as string,
            })
            res.status(201).json(product)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async deleteProduct(req: express.Request, res: express.Response) {
        try {
            await store.deleteProduct(parseInt(req.params.id as string))
            res.status(200).json({ status: `Deleted product ${req.params.id}` })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    // async getTopFive(_req: express.Request, res: express.Response) {
    //     try {
    //         const topFiveProducts = await store.getTopFiveProducts()
    //         res.status(200).json(topFiveProducts)
    //     } catch (e) {
    //         res.status(400).json(e)
    //     }
    // }
}
