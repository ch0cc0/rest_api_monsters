const addUser = 'INSERT INTO dungeon_master (username, email, password) VALUES ($1, $2, $3)';

module.exports = {
    addUser,
};