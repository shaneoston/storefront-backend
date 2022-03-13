"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../utils/database"));
class UserStore {
    async getUsers() {
        try {
            // @ts-ignore
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async getUserById(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            // @ts-ignore
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async createUser(u) {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [
                u.firstName,
                u.lastName,
                u.password_digest,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add new user ${u.firstName}. Error: ${err}`);
        }
    }
    async deleteUser(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)';
            // @ts-ignore
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
