import express from 'express'
import authToken from '../middleware/authorisation'
import OrdersController from '../controllers/orders'

const ordersRouter = express.Router()
const controller = new OrdersController()

ordersRouter.get('/', authToken, controller.getOrders)
ordersRouter.get('/:id', authToken, controller.getOrderById)
ordersRouter.get('/current-orders/:id', authToken, controller.getCurrentOrders)
ordersRouter.post('/create', authToken, controller.createOrder)
ordersRouter.post('/add-product/:id', authToken, controller.addProductToOrder)
ordersRouter.put('/:id', authToken, controller.updateOrder)
ordersRouter.delete('/:id', authToken, controller.deleteOrder)

export default ordersRouter
