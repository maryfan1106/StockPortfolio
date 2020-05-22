const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = (plaintextPassword) => {
    return bcrypt.hashSync(plaintextPassword, saltRounds);
}

const comparePassword = (plaintextPassword, hash) => {
    return bcrypt.compareSync(plaintextPassword, hash);
}

const getToken = (user) => {
    return jwt.sign(user, process.env.AUTH_SECRET);
}

module.exports = {
    hashPassword,
    comparePassword,
    getToken
};