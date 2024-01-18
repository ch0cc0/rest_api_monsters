const bcrypt = require('bcrypt');

const hash = (password, saltRounds) => {
    return bcrypt.hash(password, saltRounds);
};

const compare_password = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

module.exports = {
    hash,
    compare_password,
};