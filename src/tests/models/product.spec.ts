import { ProductStore } from '../../models/product'

const store = new ProductStore()

describe('Product Model', () => {
    describe('CRUD methods: ', () => {
        it('should create a product', async () => {
            const result = await store.createProduct({
                name: 'Test product',
                price: 40.0,
                category: 'Test category',
            })
            expect(result).toEqual({
                id: 2,
                name: 'Test product',
                price: '$40.00',
                category: 'Test category',
            })
        })

        it('should update a product', async () => {
            const result = await store.updateProduct({
                id: 2,
                name: 'Test product 2',
                price: '$50.00',
                category: 'New category',
            })
            expect(result).toEqual({
                id: 2,
                name: 'Test product 2',
                price: '$50.00',
                category: 'New category',
            })
        })

        it('should return a list of products', async () => {
            const result = await store.getProducts()
            expect(result).toEqual([
                {
                    id: 2,
                    name: 'Test product 2',
                    price: '$50.00',
                    category: 'New category',
                },
            ])
        })

        it('should return the correct product', async () => {
            const result = await store.getProductById(2)
            expect(result).toEqual({
                id: 2,
                name: 'Test product 2',
                price: '$50.00',
                category: 'New category',
            })
        })

        it('should delete the product', async () => {
            await store.deleteProduct(2)
            const result = await store.getProducts()

            expect(result).toEqual([])
        })
    })
})
