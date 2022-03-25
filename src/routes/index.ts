import express from 'express'
import usersRouter from './users'
import productsRouter from './products'
import ordersRouter from './orders'

const apiRouter = express.Router()

apiRouter.use('/users', usersRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/orders', ordersRouter)

export default apiRouter
