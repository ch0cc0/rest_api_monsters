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
};

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
};

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
};


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
};

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
};

// Cart 

const createCart = (id) => {
    return db.query(queries.createCart, [id])
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

const addMinionToCart = async (dungeon_master_id, minion_id, quantity) => {
    try {
        // Check if the item is already in the cart
        const existingCartMinion = await db.query(queries.getCartMinion, [dungeon_master_id, minion_id]);

        if (existingCartMinion.rows.length > 0) {
            // Item already in cart, update quantity
            const updatedCartMinion = await db.query(queries.updateCartMinionQuantity, [quantity, dungeon_master_id, minion_id]);
            
            if (updatedCartMinion.rows.length > 0) {
                return updatedCartMinion.rows[0];
            } else {
                return null;
            }
        } else {
            // Item not in cart, insert a new row
            const newCartMinion = await db.query(queries.insertCartMinion, [dungeon_master_id, minion_id, quantity]);

            if (newCartMinion.rows.length > 0) {
                return newCartMinion.rows[0];
            } else {
                return null;
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getCart = async (cartId) => {
    try {
        const cart = await db.query(queries.getCart, [cartId]);

        if (cart.rows.length > 0) {
            return cart.rows;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Checkout

const createDungeon = async (id) => {
    try {
        // Get cart ID
        const cartIdRows = await db.query(queries.getCartId, [id]);

        if (!(cartIdRows && cartIdRows.rows.length > 0)) {
            console.error('No cart ID found for the specified dungeon master.');
        }

        const cartId = cartIdRows.rows[0].id;

        // Check cart exists with minions
        const cart = await db.query(queries.getCart, [cartId]);

        if (!(cart.rows.length > 0)) {
            return null;
        }

        const dungeon = await db.query(queries.createDungeon, [cartId]);
        const dungeonMinions = await db.query(queries.fillDungeon, [cartId]);

        const getDungeonResults = await db.query(queries.getDungeonById, [dungeon.rows[0].id]);

        if (getDungeonResults.rows.length > 0) {
            const clearCartMinions = await db.query(queries.clearCartMinions, [cartId]);
            const clearCart = await db.query(queries.clearCart, [cartId]);

            return getDungeonResults.rows;
        } else {
            return null;
        }
        
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Dungeons

const getDungeons = async (id) => {
    try {
        const dungeons = await db.query(queries.getDungeonsByDmId, [id]);
        
        if (dungeons.rows.length > 0) {
            return dungeons.rows;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getDungeonById = async (id) => {
    try {
        const dungeon = await db.query(queries.getDungeonById, [id]);
        
        if (dungeon.rows.length > 0) {
            return dungeon.rows[0];
        } else {
            return null;
        }
        
    } catch (error) {
        console.error(error);
        throw error;
    }
};

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
    deleteDungeonMasterbyId,
    createCart,
    addMinionToCart,
    getCart,
    createDungeon,
    getDungeons,
    getDungeonById,
}