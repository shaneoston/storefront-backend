import { UserStore } from '../../models/user'

const store = new UserStore()

describe('User Model', () => {
    describe('CRUD methods exist', () => {
        it('for getUsers', () => {
            expect(store.getUsers).toBeDefined()
        })

        it('for getUserById', () => {
            expect(store.getUserById).toBeDefined()
        })

        it('for createUser', () => {
            expect(store.createUser).toBeDefined()
        })

        it('for deleteUser', () => {
            expect(store.deleteUser).toBeDefined()
        })
    })

    describe('CRUD methods: ', () => {
        it('should create a user', async () => {
            const result = await store.createUser({
                first_name: 'Sallie',
                last_name: 'Test',
                password_digest: 'password123',
            })
            expect(result).toEqual({
                id: 2,
                first_name: 'Sallie',
                last_name: 'Test',
                password_digest: 'password123',
            })
        })

        it('should update a user', async () => {
            const result = await store.updateUser({
                id: 2,
                first_name: 'Madison',
                last_name: 'Tester',
                password_digest: 'password123',
            })
            expect(result).toEqual({
                id: 2,
                first_name: 'Madison',
                last_name: 'Tester',
                password_digest: 'password123',
            })
        })

        it('should return a list of users', async () => {
            const result = await store.getUsers()
            expect(result).toEqual([
                {
                    id: 2,
                    first_name: 'Madison',
                    last_name: 'Tester',
                    password_digest: 'password123',
                },
            ])
        })

        it('should return the correct user', async () => {
            const result = await store.getUserById(2)
            expect(result).toEqual({
                id: 2,
                first_name: 'Madison',
                last_name: 'Tester',
                password_digest: 'password123',
            })
        })

        it('should delete the user', async () => {
            await store.deleteUser(2)
            const result = await store.getUsers()

            expect(result).toEqual([])
        })
    })
})
