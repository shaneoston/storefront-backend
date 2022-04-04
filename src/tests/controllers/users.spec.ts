import supertest from 'supertest'
import app from '../../index'
import { createJWTToken } from '../../utils/authentication'

const request = supertest(app)
let token: string = createJWTToken(1, 'ssmith')

describe('Users endpoints: ', () => {
    it('/users/create should return a user', () => {
        const data = {
            username: 'ssmith',
            first_name: 'Sally',
            last_name: 'Smothers',
            password: 'test1234',
        }
        request
            .post('/api/users/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(201)
            .then((response) => {
                expect(response.body.username).toEqual('ssmith')
            })
    })

    it('create user should fail if required username is not sent', () => {
        const data = {
            first_name: 'Sally',
            last_name: 'Smothers',
            password: 'test1234',
        }
        request
            .post('/api/users/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(400)
            .then((response) => {
                expect(response.body.error).toEqual(
                    'Missing username or password'
                )
            })
    })

    it('create user should fail if required password is not sent', () => {
        const data = {
            username: 'ssmith',
            first_name: 'Sally',
            last_name: 'Smothers',
        }
        request
            .post('/api/users/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(400)
            .then((response) => {
                expect(response.body.error).toEqual(
                    'Missing username or password'
                )
            })
    })

    it('/users should return all users', () => {
        request
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })

    // it('/users/:id should show a user', () => {
    //     request
    //         .get('/api/users/1')
    //         .set('Authorization', `Bearer ${token}`)
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .expect({
    //             id: 2,
    //             first_name: 'Sally',
    //             last_name: 'Smothers',
    //             password_digest: 'test1234',
    //         })
    // })

    it('should update a user', () => {
        const data = {
            username: 'madison',
            first_name: 'Sally',
            last_name: 'Smith',
            password_digest: 'test1234',
        }
        request
            .put('/api/users/1')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                username: 'madison',
                first_name: 'Sally',
                last_name: 'Smith',
                password_digest: 'test1234',
            })
    })
    //
    // it('should delete a user given its id', () => {
    //     request
    //         .delete('/api/users/1')
    //         .expect(200)
    //         .then(() => {
    //             request.get('/api/products').expect([])
    //         })
    // })
})
