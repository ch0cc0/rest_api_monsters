const db = require('../db/database');
const queries = require('./queries');
const {hash} = require('./helper_funcs');

const addUser = async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const hashedPassword = await hash(req.body.password, 10);
        const motivation = req.body.motivation;
        const result = await db.query(queries.addUser, [username, email, hashedPassword, motivation]);

        res.status(201).json({ message: "User added successfully" });
    } catch (err) {
        console.log(err);
        res.redirect('/signup');
    };
}; 

module.exports = {
    addUser,
};