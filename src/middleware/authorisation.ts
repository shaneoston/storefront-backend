import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const authToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader: string | undefined =
            req.headers.authorization
        const token: string = authorizationHeader
            ? authorizationHeader.split(' ')[1]
            : ''

        res.locals.userData = jwt.verify(
            token,
            process.env.TOKEN_SECRET as string
        )
        next()
    } catch (err) {
        // @ts-ignore
        err.code = 401
        next(err)
    }
}

export default authToken
