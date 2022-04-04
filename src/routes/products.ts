import express from 'express'
import ProductController from '../controllers/products'
import authToken from '../middleware/authorisation'

const productsRouter = express.Router()
const controller = new ProductController()

productsRouter.get('/', controller.getProducts)
productsRouter.get('/:id', controller.getProductsById)
productsRouter.post('/create', authToken, controller.createProduct)
productsRouter.put('/:id', controller.updateProduct)
productsRouter.delete('/:id', controller.deleteProduct)

export default productsRouter
