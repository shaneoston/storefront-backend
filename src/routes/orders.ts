import express from 'express'

const ordersRouter = express.Router()

ordersRouter.get('/', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the get orders endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

ordersRouter.get('/:id', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the get order by id endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

ordersRouter.post('/create', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the create order endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

ordersRouter.put('/:id', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the update order endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})
ordersRouter.delete('/:id', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the delete order endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

export default ordersRouter
