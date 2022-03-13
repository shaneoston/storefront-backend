"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../utils/database"));
class ProductStore {
    async getProducts() {
        try {
            // @ts-ignore
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    async getProductById(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            // @ts-ignore
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async createProduct(p) {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [
                p.name,
                p.price,
                p.category,
            ]);
            connection.release();
            const { rows } = result;
            return {
                id: rows[0].id,
                name: rows[0].name,
                price: Number(rows[0].price),
                category: rows[0].category,
            };
        }
        catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
        }
    }
    async deleteProduct(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
