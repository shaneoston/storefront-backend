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

    describe('CRUD methods tests', () => {
        it('should create a user', async () => {
            const result = await store.createUser({
                first_name: 'Sallie',
                last_name: 'Test',
                password_digest: 'password123'
            })
            expect(result).toEqual({
                id: 1,
                first_name: 'Sallie',
                last_name: 'Test',
                password_digest: 'password123'
            })
        })

        it('should return a list of users', async () => {
            const result = await store.getUsers()
            expect(result).toEqual([
                {
                    id: 1,
                    first_name: 'Sallie',
                    last_name: 'Test',
                    password_digest: 'password123'
                },
            ])
        })

        it('should return the correct user', async () => {
            const result = await store.getUserById(1)
            expect(result).toEqual({
                id: 1,
                first_name: 'Sallie',
                last_name: 'Test',
                password_digest: 'password123'
            })
        })

        it('should delete the user', async () => {
            await store.deleteUser(1)
            const result = await store.getUsers()

            expect(result).toEqual([])
        })
    })
})
