const addUser = 'INSERT INTO dungeon_master (username, email, password) VALUES ($1, $2, $3)';
const findUserByUsername = 'SELECT * FROM dungeon_master WHERE username = $1';
const findUserById = 'SELECT * FROM dungeon_master WHERE id = $1';

module.exports = {
    addUser,
    findUserByUsername,
    findUserById
};