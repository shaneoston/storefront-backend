import { ProductStore } from '../../models/product'

const store = new ProductStore()

describe('Product Model', () => {
    describe('CRUD methods exist', () => {
        it('for getProducts', () => {
            expect(store.getProducts).toBeDefined()
        })

        it('for getProductsById', () => {
            expect(store.getProductById).toBeDefined()
        })

        it('for createProduct', () => {
            expect(store.createProduct).toBeDefined()
        })

        it('for deleteProduct', () => {
            expect(store.deleteProduct).toBeDefined()
        })
    })

    describe('CRUD methods tests', () => {
        it('should create a product', async () => {
            const result = await store.createProduct({
                name: 'Test product',
                // prettier-ignore
                price: 40.00,
                category: 'Test category',
            })
            expect(result).toEqual({
                id: 2,
                name: 'Test product',
                // prettier-ignore
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

        it('should delete the book', async () => {
            await store.deleteProduct(2)
            const result = await store.getProducts()

            expect(result).toEqual([])
        })
    })
})
