"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const store = new product_1.ProductStore();
const product = {
    name: 'Test product',
    // prettier-ignore
    price: 4.00,
    category: 'Test category',
};
describe('Product Model', () => {
    describe('CRUD methods exist', () => {
        it('for getProducts', () => {
            expect(store.getProducts).toBeDefined();
        });
        it('for getProductsById', () => {
            expect(store.getProductById).toBeDefined();
        });
        it('for createProduct', () => {
            expect(store.createProduct(product)).toBeDefined();
        });
        it('for deleteProduct', () => {
            expect(store.deleteProduct('3')).toBeDefined();
        });
    });
    describe('CRUD methods tests', () => {
        it('should create a product', async () => {
            const result = await store.createProduct({
                name: 'Test product',
                // prettier-ignore
                price: 40.00,
                category: 'Test category',
            });
            expect(result).toEqual({
                id: 1,
                name: 'Test product',
                // prettier-ignore
                price: 40.00,
                category: 'Test category',
            });
        });
    });
});
