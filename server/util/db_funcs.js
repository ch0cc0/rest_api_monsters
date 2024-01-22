const db = require('../db/database');
const queries = require('./queries');

const getUserByUsername = (username) => {
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

const getUserById = (id) => {
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

const getAllMinions = () => {
    return db.query(queries.selectAllMinions)
        .then(result => {
            if (result.rows.length > 0) {
                return result.rows;
            } else {
                return null;
            }
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const getMinionById = (id) => {
    return db.query(queries.getMinionById, [id])
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
}

const getMinionsByType = (type) => {
    return db.query(queries.getMinionsByType, [type])
        .then(result => {
            if (result.rows.length > 0) {
                return result.rows;
            } else {
                return null;
            }
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}


const getMinionsByName = (name) => {
    return db.query(queries.getMinionsByName, [name])
        .then(result => {
            if (result.rows.length > 0) {
                return result.rows;
            } else {
                return null;
            }
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const getMinionsByCost = (cost) => {
    return db.query(queries.getMinionsByCost, [cost])
        .then(result => {
            if (result.rows.length > 0) {
                return result.rows;
            } else {
                return null;
            }
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

module.exports = {
    getUserByUsername,
    getUserById,
    getAllMinions,
    getMinionById,
    getMinionsByType,
    getMinionsByName,
    getMinionsByCost
}