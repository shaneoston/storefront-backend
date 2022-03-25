import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)

describe('Orders endpoints: ', () => {
    it('should have a show orders endpoint', async () => {
        const response = await request.get('/api/orders')
        expect(response.status).toBe(200)
    })

    it('should have a get order by id endpoint', async () => {
        const response = await request.get('/api/orders/1')
        expect(response.status).toBe(200)
    })

    it('should have a create order endpoint', async () => {
        const response = await request.post('/api/orders/create')
        expect(response.status).toBe(200)
    })

    it('should have an update order endpoint', async () => {
        const response = await request.put('/api/orders/1')
        expect(response.status).toBe(200)
    })

    it('should have a delete order endpoint', async () => {
        const response = await request.delete('/api/orders/1')
        expect(response.status).toBe(200)
    })
})
