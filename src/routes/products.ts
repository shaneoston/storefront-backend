import express from 'express'

const productsRouter = express.Router()

productsRouter.get('/', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the get products endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

productsRouter.get('/:id', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the get product by id endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

productsRouter.post(
    '/create',
    (req: express.Request, res: express.Response) => {
        try {
            res.send('This is the create product endpoint')
        } catch (e) {
            res.status(400)
            res.json(e)
        }
    }
)

productsRouter.put('/:id', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the update product endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})
productsRouter.delete('/:id', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the delete product endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

export default productsRouter
