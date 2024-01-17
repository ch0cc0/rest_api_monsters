require('dotenv').config();

const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    password: process.env.POSTGRES_PASS,
    host: "localhost",
    port: 5432
});

module.exports = pool;