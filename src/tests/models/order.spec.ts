import { OrderStore } from '../../models/order'
import { ProductStore } from '../../models/product'
import { UserStore } from '../../models/user'

const store = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()

describe('Order Model', () => {
    describe('CRUD methods exist', () => {
        it('for getOrders', () => {
            expect(store.getOrders).toBeDefined()
        })

        it('for getOrderById', () => {
            expect(store.getOrderById).toBeDefined()
        })

        it('for createOrder', () => {
            expect(store.createOrder).toBeDefined()
        })

        it('for deleteOrder', () => {
            expect(store.deleteOrder).toBeDefined()
        })
    })

    describe('CRUD methods: ', () => {
        beforeAll(async () => {
            await productStore.createProduct({
                name: 'Superman under roos',
                // prettier-ignore
                price: 40.00,
                category: 'Test category',
            })
            await userStore.createUser({
                first_name: 'Sallie',
                last_name: 'Test',
                password_digest: 'password123',
            })
        })

        afterAll(async () => {
            await productStore.deleteProduct(1)
            await userStore.deleteUser(1)
        })

        it('should create an order', async () => {
            const result = await store.createOrder({
                product_id: 1,
                quantity: 1,
                user_id: 1,
                status: 'new',
            })
            expect(result).toEqual({
                id: 1,
                product_id: 1,
                quantity: 1,
                user_id: 1,
                status: 'new',
            })
        })

        it('should return a list of orders', async () => {
            const result = await store.getOrders()
            expect(result).toEqual([
                {
                    id: 1,
                    product_id: 1,
                    quantity: 1,
                    user_id: 1,
                    status: 'new',
                },
            ])
        })

        it('should return the correct order', async () => {
            const result = await store.getOrderById(1)
            expect(result).toEqual({
                id: 1,
                product_id: 1,
                quantity: 1,
                user_id: 1,
                status: 'new',
            })
        })

        it('should update an order', async () => {
            const result = await store.updateOrder({
                id: 1,
                product_id: 1,
                quantity: 1,
                user_id: 1,
                status: 'complete',
            })
            expect(result).toEqual({
                id: 1,
                product_id: 1,
                quantity: 1,
                user_id: 1,
                status: 'complete',
            })
        })

        it('should delete the order', async () => {
            await store.deleteOrder(1)
            const result = await store.getOrders()

            expect(result).toEqual([])
        })
    })
})
