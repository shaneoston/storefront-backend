import express from 'express'
import jwt from 'jsonwebtoken'
import { UserStore } from '../models/user'
import bcrypt from 'bcrypt'

const store = new UserStore()
const pepper: string = process.env.BCRYPT_PASSWORD as string
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string)

export default class UsersController {
    async getUsers(_req: express.Request, res: express.Response) {
        try {
            const users = await store.getUsers()
            res.status(200).json(users)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async getUserById(req: express.Request, res: express.Response) {
        try {
            const user = await store.getUserById(parseInt(req.params.id))

            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json('user not found')
            }
        } catch (e) {
            // @ts-ignore
            res.status(400).json({ e: e.toString() })
        }
    }

    async createUser(req: express.Request, res: express.Response) {
        try {
            if (!(req.query.username || !req.query.password)) {
                return res.status(400).json({
                    error: 'Missing username or password',
                })
            }

            const hashedPassword = bcrypt.hashSync(
                req.query.password + pepper,
                saltRounds
            )

            const user = await store.createUser({
                username: req.query.username as string,
                first_name: req.query.first_name as string,
                last_name: req.query.last_name as string,
                password: hashedPassword,
            })
            delete user.password_digest

            // @ts-ignore
            user.token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.TOKEN_SECRET as string
            )
            res.status(201).json(user)
        } catch (e) {
            return res.status(400).json(e)
        }
    }

    async updateUser(req: express.Request, res: express.Response) {
        try {
            if (!req.query.username || !req.query.password) {
                return res.status(400).json({
                    error: 'Missing required parameters',
                })
            }
            const user = await store.updateUser({
                id: parseInt(req.params.id as string),
                username: req.query.username as string,
                first_name: req.query.first_name as string,
                last_name: req.query.last_name as string,
                password: req.query.password as string,
            })
            res.status(201).json(user)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async deleteUser(req: express.Request, res: express.Response) {
        try {
            await store.deleteUser(parseInt(req.params.id as string))
            res.status(200).json({ status: `Deleted user ${req.params.id}` })
        } catch (e) {
            res.status(500).json(e)
        }
    }
}
