const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = (plaintextPassword) => {
    return bcrypt.hashSync(plaintextPassword, saltRounds);
}

const comparePassword = (plaintextPassword, hash) => {
    return bcrypt.compareSync(plaintextPassword, hash);
}

module.exports = {
    hashPassword,
    comparePassword
};