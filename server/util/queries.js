const addUser = 'INSERT INTO dungeon_master (username, email, password) VALUES ($1, $2, $3)';
const findUserByUsername = 'SELECT * FROM dungeon_master WHERE username = $1';
const findUserById = 'SELECT * FROM dungeon_master WHERE id = $1';
const selectAllMinions = 'SELECT * FROM minions';
const getMinionById = 'SELECT * FROM minions WHERE id = $1';
const getMinionsByType = 'SELECT * FROM minions WHERE type = $1';
const getMinionsByCost = 'SELECT * FROM minions WHERE cost = $1';
const getMinionsByName = "SELECT * FROM minions WHERE name ILIKE '%' || $1 || '%'";

module.exports = {
    addUser,
    findUserByUsername,
    findUserById,
    selectAllMinions,
    getMinionById,
    getMinionsByType,
    getMinionsByCost,
    getMinionsByName,
};