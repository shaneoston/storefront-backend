import express from 'express'

const userRouter = express.Router()

userRouter.get('/', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the get users endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

userRouter.get('/:id', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the get user by id endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

userRouter.post('/create', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the create user endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

userRouter.put('/:id', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the update user endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})
userRouter.delete('/:id', (req: express.Request, res: express.Response) => {
    try {
        res.send('This is the delete user endpoint')
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

export default userRouter
