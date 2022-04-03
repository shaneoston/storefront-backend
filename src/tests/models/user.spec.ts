import { UserStore } from '../../models/user'

const store = new UserStore()

describe('User Model', () => {
    describe('CRUD methods: ', () => {
        it('should create a user', async () => {
            const result = await store.createUser({
                username: 'ssmith',
                first_name: 'Sallie',
                last_name: 'Test',
                password: 'password123',
            })
            console.log(result)
            expect(result.username).toEqual('ssmith')
        })

        it('should update a user', async () => {
            const result = await store.updateUser({
                id: 2,
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
            const result = await store.getUserById(2)
            expect(result.username).toEqual('madison')
        })

        it('should delete the user', async () => {
            await store.deleteUser(2)
            const result = await store.getUsers()

            expect(result).toEqual([])
        })
    })
})
