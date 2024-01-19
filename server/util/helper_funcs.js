const bcrypt = require('bcrypt');

const hash = (password, saltRounds) => {
    return bcrypt.hash(password, saltRounds);
};

const compare_password = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};


const checkIfAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
};

const checkIfNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    next(); 
};

module.exports = {
    hash,
    compare_password,
    checkIfAuthenticated,
    checkIfNotAuthenticated,
};