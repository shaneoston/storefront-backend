import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)

describe('Product controllers: ', () => {
    it('should return a new user after it is created', () => {
        const data = {
            name: 'Test',
            price: 40.0,
            category: 'category a',
        }
        request
            .post('/api/products/create')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({
                id: 1,
                name: 'Test',
                price: '$40.00',
                category: 'category a',
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

    it('should show all products', () => {
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

    it('should show a product given an id', () => {
        request
            .get('/api/products/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                name: 'Test',
                price: 40.0,
                category: 'category a',
            })
    })

    it('should have an update product endpoint', () => {
        const data = {
            name: 'Test edited',
            price: 50.0,
        }
        request
            .put('/api/products/1')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                name: 'Test edited',
                price: 50.0,
                category: 'category a',
            })
    })

    it('should delete a product given its id', () => {
        request
            .delete('/api/products/1')
            .expect(200)
            .then(() => {
                request.get('/api/products').expect({})
            })
    })
})
