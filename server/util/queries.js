const addUser = 'INSERT INTO dungeon_master (username, email, password, motivation) VALUES ($1, $2, $3, $4)';
const findUserByUsername = 'SELECT * FROM dungeon_master WHERE username = $1';
const findUserById = 'SELECT * FROM dungeon_master WHERE id = $1';

// Dungeon Master
const getDungeonMasterById = 'SELECT username, email, motivation FROM dungeon_master WHERE id = $1';
const updateDungeonMasterMotivationById = 'UPDATE dungeon_master SET motivation = $1 WHERE id = $2';
const deleteDungeonMasterbyId = 'DELETE FROM dungeon_master WHERE id = $1';

// Minions
const selectAllMinions = 'SELECT * FROM minions';
const getMinionById = 'SELECT * FROM minions WHERE id = $1';
const getMinionsByType = 'SELECT * FROM minions WHERE type = $1';
const getMinionsByCost = 'SELECT * FROM minions WHERE cost = $1';
const getMinionsByName = "SELECT * FROM minions WHERE name ILIKE '%' || $1 || '%'";

// Cart
const createCart = 'INSERT INTO cart(dungeon_master_id) VALUES($1) RETURNING *';
const getCartMinion = 'SELECT * FROM cart_minions WHERE cart_id = (SELECT id FROM cart WHERE dungeon_master_id = $1) AND minion_id = $2';
const insertCartMinion = 'INSERT INTO cart_minions(cart_id, minion_id, quantity) VALUES ((SELECT id FROM cart WHERE dungeon_master_id = $1), $2, $3) RETURNING *';
const updateCartMinionQuantity = 'UPDATE cart_minions SET quantity = quantity + $1 WHERE cart_id = (SELECT id FROM cart WHERE dungeon_master_id = $2)  AND minion_id = $3 RETURNING *';
const getCartId = 'SELECT id FROM cart WHERE dungeon_master_id = $1';
const getCart = 'SELECT cm.minion_id, m.name, m.type, m.cost, cm.quantity, m.cost * cm.quantity AS total_cost FROM cart_minions cm JOIN minions m ON cm.minion_id = m.id JOIN cart c ON cm.cart_id = c.id WHERE c.id = $1';
// clear cart
const clearCartMinions = 'DELETE FROM cart_minions WHERE cart_id = $1';
const clearCart = 'DELETE FROM cart WHERE id = $1';


// Checkout
const createDungeon = 'WITH dungeon_data AS (SELECT c.dungeon_master_id, cm.minion_id, cm.quantity, m.cost, c.id AS cart_id FROM cart c JOIN cart_minions cm ON c.id = cm.cart_id JOIN minions m ON cm.minion_id = m.id WHERE c.id = $1) INSERT INTO dungeon (dungeon_master_id, creation_date, total_cost) SELECT dungeon_master_id, NOW(), SUM(quantity * cost) AS total_cost FROM dungeon_data GROUP BY dungeon_master_id RETURNING *';
const fillDungeon = 'WITH dungeon_data AS (SELECT c.dungeon_master_id, cm.minion_id, cm.quantity, m.cost, c.id AS cart_id FROM cart c JOIN cart_minions cm ON c.id = cm.cart_id JOIN minions m ON cm.minion_id = m.id WHERE c.id = $1) INSERT INTO dungeon_minions (dungeon_id, minion_id, quantity) SELECT d.id AS dungeon_id, dd.minion_id, dd.quantity FROM dungeon_data dd JOIN dungeon d ON dd.dungeon_master_id = d.dungeon_master_id RETURNING *';

// Dungeon 
const getDungeonById = 'SELECT d.id AS dungeon_id, d.creation_date, d.total_cost AS dungeon_total_cost, dm.minion_id, m.name AS minion_name, m.type AS minion_type, m.cost AS minion_cost, dm.quantity AS minion_quantity, (dm.quantity * m.cost) AS minion_total_cost FROM dungeon d JOIN dungeon_minions dm ON d.id = dm.dungeon_id JOIN minions m ON dm.minion_id = m.id WHERE d.id = $1';
const getDungeonByDmId = 'SELECT d.id AS dungeon_id, d.creation_date, d.total_cost AS dungeon_total_cost, dm.minion_id, m.name AS minion_name, m.type AS minion_type, m.cost AS minion_cost, dm.quantity AS minion_quantity, (dm.quantity * m.cost) AS minion_total_cost FROM dungeon d JOIN dungeon_minions dm ON d.id = dm.dungeon_id JOIN minions m ON dm.minion_id = m.id WHERE d.dungeon_master_id = $1';
const getDungeonsByDmId = 'SELECT id, creation_date, total_cost FROM dungeon WHERE dungeon_master_id = $1'; 


module.exports = {
    addUser,
    findUserByUsername,
    findUserById,
    getDungeonMasterById,
    updateDungeonMasterMotivationById,
    deleteDungeonMasterbyId,
    selectAllMinions,
    getMinionById,
    getMinionsByType,
    getMinionsByCost,
    getMinionsByName,
    createCart,
    getCartMinion,
    insertCartMinion,
    updateCartMinionQuantity,
    getCartId,
    getCart,
    clearCartMinions,
    clearCart,
    createDungeon,
    fillDungeon,
    getDungeonById,
    getDungeonByDmId,
    getDungeonsByDmId,
};