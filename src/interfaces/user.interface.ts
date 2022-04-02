interface User {
    id?: number
    username: string
    first_name: string
    last_name: string
    password?: string
    password_digest?: string
}

export default User
