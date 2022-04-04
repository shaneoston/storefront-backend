import jwt from 'jsonwebtoken'

const tokenSecret: string = process.env.TOKEN_SECRET as string

export const createJWTToken = (id: number, username: string): string => {
    return jwt.sign({ id, username }, tokenSecret)
}
