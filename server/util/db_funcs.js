const db = require('../db/database');
const queries = require('./queries');

function getUserByUsername(username) {
    return db.query(queries.findUserByUsername, [username])
        .then(result => {
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};

function getUserById(id) {
    return db.query(queries.findUserById, [id])
        .then(result => {
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};

module.exports = {
    getUserByUsername,
    getUserById,
}