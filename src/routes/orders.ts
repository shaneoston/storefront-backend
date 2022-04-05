import express from 'express'
import authToken from '../middleware/authorisation'
import userRouter from './users'
import OrdersController from '../controllers/orders'

const ordersRouter = express.Router()
const controller = new OrdersController()

ordersRouter.get('/', controller.getOrders)
userRouter.get('/:id', controller.getOrderById)
userRouter.get('/current-order/:id', authToken, controller.getCurrentOrders)
userRouter.post('/create', controller.createOrder)
userRouter.put('/:id', controller.updateOrder)
userRouter.delete('/:id', controller.deleteOrder)

export default ordersRouter
