import express from 'express'
import { UserStore } from '../models/user'

const store = new UserStore()

export default class UsersController {
    async getUsers(_req: express.Request, res: express.Response) {
        try {
            const users = await store.getUsers()
            res.status(200).json(users)
        } catch (e) {
            res.status(500)
            res.json(e)
        }
    }

    async getUserById(req: express.Request, res: express.Response) {
        try {
            const user = await store.getUserById(parseInt(req.params.id))
            res.status(200).json(user)
        } catch (e) {
            res.status(500)
            res.json(e)
        }
    }

    async createUser(req: express.Request, res: express.Response) {
        try {
            if (!req.query.last_name || !req.query.password_digest) {
                return res.status(400).json({
                    error: 'Missing parameters',
                })
            }
            const user = await store.createUser({
                first_name: req.query.first_name as string,
                last_name: req.query.last_name as string,
                password_digest: req.query.password_digest as string,
            })
            res.status(201).json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updateUser(req: express.Request, res: express.Response) {
        try {
            if (!req.query.last_name || !req.query.password_digest) {
                return res.status(400).json({
                    error: 'Missing required parameters',
                })
            }
            const user = await store.updateUser({
                id: parseInt(req.params.id as string),
                first_name: req.query.first_name as string,
                last_name: req.query.last_name as string,
                password_digest: req.query.password_digest as string,
            })
            res.status(201).json(user)
        } catch (e) {
            res.status(500).json(e)
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
