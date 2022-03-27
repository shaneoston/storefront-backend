import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)

fdescribe('Product controllers: ', () => {
    it('should return a new user after it is created', async () => {
        const data = {
            name: 'Test',
            price: 40.0,
            category: 'category a',
        }
        request
            .post('/api/products/create')
            .send(data)
            .then(() => {
                request.get('/api/products').expect({
                    id: 1,
                    name: 'Test',
                    price: 40.0,
                    category: 'category a',
                })
            })
    })

    it('create product should fail if name is not included in parameters', () => {
        const data = {
            name: 'Test',
            price: 40.0,
            category: 'category b',
        }
        request.post('/api/products/create').send(data).expect(400).expect({
            error: 'Error: Product name is required',
        })
    })

    it('should show all products', async () => {
        request
            .get('/api/products')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                name: 'Test',
                price: 40.0,
                category: 'category a',
            })
    })
    //
    // it('should have a get product by id endpoint', async () => {
    //     const response = await request.get('/api/products/1')
    //     expect(response.status).toBe(200)
    // })
    //
    // it('should have a create product endpoint', async () => {
    //     const response = await request.post('/api/products/create')
    //     expect(response.status).toBe(200)
    // })
    //
    // it('should have an update product endpoint', async () => {
    //     const response = await request.put('/api/products/1')
    //     expect(response.status).toBe(200)
    // })
    //
    // it('should have a delete product endpoint', async () => {
    //     const response = await request.delete('/api/products/1')
    //     expect(response.status).toBe(200)
    // })
})
