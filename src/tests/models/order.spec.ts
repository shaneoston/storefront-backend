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

    describe('CRUD methods tests: ', () => {
        it('should create an order', async () => {
            await productStore.createProduct({
                name: 'Test product',
                // prettier-ignore
                price: 40.00,
                category: 'Test category',
            })
            await userStore.createUser({
                first_name: 'Sallie',
                last_name: 'Test',
                password_digest: 'password123',
            })
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
                product_id: 1,
                quantity: 1,
                user_id: 1,
                status: 'new',
            })
        })

        it('should delete the order', async () => {
            await store.deleteOrder(1)
            const result = await store.getOrders()

            expect(result).toEqual([])
        })
    })
})
