const db = require('../db/database');
const queries = require('./queries');

// users (same as dungeon master but used for login requests);

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

// Dungeon Master

const getDungeonMasterById = (id) => {
    return db.query(queries.getDungeonMasterById, [id])
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

const updateDungeonMasterMotivationById = (motivation, id) => {
    return db.query(queries.updateDungeonMasterMotivationById, [motivation, id])
        .then(result => {
            return result.rowCount > 0;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};

const deleteDungeonMasterbyId = (id) => {
    return db.query(queries.deleteDungeonMasterbyId, [id])
        .then(result => {
            return result.rowCount > 0;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};

// Minions

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
    getDungeonMasterById,
    updateDungeonMasterMotivationById,
    getAllMinions,
    getMinionById,
    getMinionsByType,
    getMinionsByName,
    getMinionsByCost,
    deleteDungeonMasterbyId
}