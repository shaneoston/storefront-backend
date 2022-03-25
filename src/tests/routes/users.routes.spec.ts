import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)

describe('Users endpoints: ', () => {
    it('should have a show users endpoint', async () => {
        const response = await request.get('/api/users')
        expect(response.status).toBe(200)
    })

    it('should have a get user by id endpoint', async () => {
        const response = await request.get('/api/users/1')
        expect(response.status).toBe(200)
    })

    it('should have a create user endpoint', async () => {
        const response = await request.post('/api/users/create')
        expect(response.status).toBe(200)
    })

    it('should have an update user endpoint', async () => {
        const response = await request.put('/api/users/1')
        expect(response.status).toBe(200)
    })

    it('should have a delete user endpoint', async () => {
        const response = await request.delete('/api/users/1')
        expect(response.status).toBe(200)
    })
})
