const bcrypt = require('bcrypt');

const hash = (password, saltRounds) => {
    return bcrypt.hash(password, saltRounds);
};

module.exports = {
    hash,
};