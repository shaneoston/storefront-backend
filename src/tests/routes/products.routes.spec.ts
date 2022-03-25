import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)

describe('Product endpoints: ', () => {
    it('should have a show products endpoint', async () => {
        const response = await request.get('/api/products')
        expect(response.status).toBe(200)
    })

    it('should have a get product by id endpoint', async () => {
        const response = await request.get('/api/products/1')
        expect(response.status).toBe(200)
    })

    it('should have a create product endpoint', async () => {
        const response = await request.post('/api/products/create')
        expect(response.status).toBe(200)
    })

    it('should have an update product endpoint', async () => {
        const response = await request.put('/api/products/1')
        expect(response.status).toBe(200)
    })

    it('should have a delete product endpoint', async () => {
        const response = await request.delete('/api/products/1')
        expect(response.status).toBe(200)
    })
})
