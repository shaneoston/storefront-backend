import supertest from 'supertest'
import app from '../../index'
import { createJWTToken } from '../../utils/authentication'

const request = supertest(app)
let token: string = createJWTToken(2, 'sbearer')

describe('Orders controllers: ', () => {
    it('/orders/create should return a new order ', () => {
        const data = {
            product_id: 1,
            quantity: 1,
            user_id: 1,
            status: 'new',
        }
        request
            .post('/api/order/create')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                product_id: 1,
                quantity: 1,
                user_id: 1,
                status: 'new',
            })
    })

    it('/orders/create should fail if product_id is not included in parameters', () => {
        const data = {
            quantity: 1,
            user_id: 1,
            status: 'new',
        }
        request.post('/api/orders/create').send(data).expect(400).expect({
            error: 'Missing one or more required parameters',
        })
    })

    it('/orders/create should fail if quantity is not included in parameters', () => {
        const data = {
            user_id: 1,
            product_id: 1,
            status: 'new',
        }
        request.post('/api/orders/create').send(data).expect(400).expect({
            error: 'Missing one or more required parameters',
        })
    })

    it('/orders/create should fail if user_id is not included in parameters', () => {
        const data = {
            product_id: 1,
            quantity: 1,
            status: 'new',
        }
        request.post('/api/orders/create').send(data).expect(400).expect({
            error: 'Missing one or more required parameters',
        })
    })

    it('/orders/create should fail if status is not included in parameters', () => {
        const data = {
            user_id: 1,
            product_id: 1,
            quantity: 'new',
        }
        request.post('/api/orders/create').send(data).expect(400).expect({
            error: 'Missing one or more required parameters',
        })
    })

    it('/orders should show all orders', () => {
        request
            .get('/api/orders')
            .expect('Content-Type', 'applicatioon/json')
            .expect(200)
            .expect({
                id: 1,
                product_id: 1,
                quantity: 1,
                user_id: 1,
                status: 'new',
            })
    })

    it('/orders/:id show a order', () => {
        request
            .get('/api/orders/1')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                product_id: 1,
                quantity: 1,
                user_id: 1,
                status: 'new',
            })
    })

    it('/orders should update an order', () => {
        const data = {
            id: 1,
            product_id: 1,
            quantity: 10,
            user_id: 1,
            status: 'in progress',
        }
        request
            .put('/api/orders/1')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                product_id: 1,
                quantity: 10,
                user_id: 1,
                status: 'in progress',
            })
    })

    it('/orders/:id should delete an order given its id', () => {
        request
            .delete('/api/products/1')
            .expect(200)
            .then(() => {
                request.get('/api/products').expect({})
            })
    })

    it('/orders/current-order/:id should show orders with status not completed', () => {
        request
            .get('/api/orders/current-order/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                product_id: 1,
                quantity: 10,
                user_id: 1,
                status: 'in progress',
            })
    })
})