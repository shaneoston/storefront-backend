"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, DEV_POSTGRES_DB, TEST_POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, } = process.env;
let pool;
console.log(ENV);
if (ENV === 'test') {
    pool = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: TEST_POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
if (ENV === 'dev') {
    pool = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: DEV_POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = pool;
