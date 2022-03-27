import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)

describe('Users controller: ', () => {
    it('should return a new user after it is created', () => {
        const data = {
            first_name: 'Sally',
            last_name: 'Smothers',
            password_digest: 'test1234',
        }
        request
            .post('/api/users/create')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({
                id: 1,
                first_name: 'Sally',
                last_name: 'Smothers',
                password_digest: 'test1234',
            })
    })

    it('create user should fail if required last_name is not sent', () => {
        const data = {
            first_name: 'Sally',
            password_digest: 'test1234',
        }
        request.post('/api/users/create').send(data).expect(400).expect({
            error: 'Missing parameters',
        })
    })

    it('create user should fail if required password is not sent', () => {
        const data = {
            first_name: 'Sally',
            last_name: 'Smith',
        }
        request.post('/api/users/create').send(data).expect(400).expect({
            error: 'Missing parameters',
        })
    })

    it('should return all users', () => {
        request
            .get('/api/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                first_name: 'Sally',
                last_name: 'Smothers',
                password_digest: 'test1234',
            })
    })

    it('should show a user given an id', () => {
        request
            .get('/api/users/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                first_name: 'Sally',
                last_name: 'Smothers',
                password_digest: 'test1234',
            })
    })

    it('should update a user', () => {
        const data = {
            first_name: 'Sally',
            last_name: 'Smith',
            password_digest: 'test1234',
        }
        request
            .put('/api/users/1')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                first_name: 'Sally',
                last_name: 'Smith',
                password_digest: 'test1234',
            })
    })

    it('should delete a user given its id', () => {
        request
            .delete('/api/users/1')
            .expect(200)
            .then(() => {
                request.get('/api/products').expect([])
            })
    })
})
