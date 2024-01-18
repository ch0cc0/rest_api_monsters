if ( process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    password: process.env.POSTGRES_PASS,
    host: "localhost",
    port: 5432,
    database: "monster_db"
});

const query = (text, params, callback) => {
    const queryPromise = pool.query(text, params);

    if (callback) {
        // If a callback is provided, use it
        queryPromise.then((res) => callback(null, res)).catch(callback);
    } else {
        // Otherwise, return the promise
        return queryPromise;
    }
};



module.exports = {
    query
};