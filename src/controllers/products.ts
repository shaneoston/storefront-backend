import express from 'express'
import { ProductStore } from '../models/product'

const store = new ProductStore()

export default class Products {
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
            res.send('This is the get product by id endpoint')
        } catch (e) {
            res.status(400)
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
            console.log(e)
            res.status(400).json(e)
        }
    }

    async updateProduct(req: express.Request, res: express.Response) {
        try {
            res.send('This is the update product endpoint')
        } catch (e) {
            res.status(400)
            res.json(e)
        }
    }

    async deleteProduct(req: express.Request, res: express.Response) {
        try {
            res.send('This is the delete product endpoint')
        } catch (e) {
            res.status(400)
            res.json(e)
        }
    }
}
