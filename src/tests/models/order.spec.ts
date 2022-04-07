// import { OrderStore } from '../../models/order'
// import { ProductStore } from '../../models/product'
// import { UserStore } from '../../models/user'
//
// const store = new OrderStore()
// const productStore = new ProductStore()
// const userStore = new UserStore()
// let productId: number, userId: number
//
// describe('Order Model', () => {
//     beforeAll(async () => {
//         const product = await productStore.createProduct({
//             name: 'Superman underroos',
//             price: 40.0,
//             category: 'Underwear',
//         })
//         productId = product.id as number
//         const user = await userStore.createUser({
//             username: 'ssmith',
//             first_name: 'Sallie',
//             last_name: 'Test',
//             password: 'password123',
//         })
//         userId = user.id as number
//     })
//
//     afterAll(async () => {
//         await productStore.deleteProduct(productId)
//         await userStore.deleteUser(userId)
//     })
//
//     it('should create an order', async () => {
//         const result = await store.createOrder({
//             product_id: productId,
//             quantity: 10,
//             user_id: userId,
//             status: 'new',
//         })
//         expect(result).toEqual({
//             id: 1,
//             product_id: productId,
//             quantity: 10,
//             user_id: userId,
//             status: 'new',
//         })
//     })
//
//     it('should return a list of orders', async () => {
//         const result = await store.getOrders()
//         expect(result).toEqual([
//             {
//                 id: 1,
//                 product_id: productId,
//                 quantity: 10,
//                 user_id: userId,
//                 status: 'new',
//             },
//         ])
//     })
//
//     it('should return the correct order', async () => {
//         const result = await store.getOrderById(1)
//         expect(result).toEqual({
//             id: 1,
//             product_id: productId,
//             quantity: 10,
//             user_id: userId,
//             status: 'new',
//         })
//     })
//
//     it('should update order status', async () => {
//         const result = await store.updateOrder({
//             id: 1,
//             product_id: productId,
//             quantity: 10,
//             user_id: userId,
//             status: 'complete',
//         })
//         expect(result).toEqual({
//             id: 1,
//             product_id: productId,
//             quantity: 10,
//             user_id: userId,
//             status: 'complete',
//         })
//     })
//
//     it('should delete the order', async () => {
//         await store.deleteOrder(1)
//         const result = await store.getOrders()
//         expect(result).toEqual([])
//     })
// })
