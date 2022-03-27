import express from 'express'
import UsersControllers from '../controllers/users'

const userRouter = express.Router()
const controller = new UsersControllers()

userRouter.get('/', controller.getUsers)
userRouter.get('/:id', controller.getUserById)
userRouter.post('/create', controller.createUser)
userRouter.put('/:id', controller.updateUser)
userRouter.delete('/:id', controller.deleteUser)

export default userRouter
