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
};