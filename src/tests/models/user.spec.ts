import { UserStore } from '../../models/user'

const store = new UserStore()

describe('User Model', () => {
    it('should create a user', async () => {
        const result = await store.createUser({
            username: 'ssmith',
            first_name: 'Sallie',
            last_name: 'Test',
            password: 'password123',
        })
        expect(result.username).toEqual('ssmith')
    })

    it('should update a user', async () => {
        const users = await store.getUsers()
        const userId = users[0].id

        const result = await store.updateUser({
            id: userId,
            username: 'madison',
            first_name: 'Madison',
            last_name: 'Tester',
            password: 'password123',
        })
        expect(result.username).toEqual('madison')
    })

    it('should return a list of users', async () => {
        const result = await store.getUsers()
        expect(result.length).toEqual(1)
    })

    it('should return the correct user', async () => {
        const users = await store.getUsers()
        const userId = users[0].id as number

        const result = await store.getUserById(userId)
        expect(result.username).toEqual('madison')
    })

    it('should delete the user', async () => {
        let users = await store.getUsers()
        const userId = users[0].id as number

        await store.deleteUser(userId)
        users = await store.getUsers()

        expect(users.length).toEqual(0)
    })
})
