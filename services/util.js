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

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        try {
            const user = jwt.verify(token, process.env.AUTH_SECRET);
            req.user = user;
            next();
          } catch (err) {
            res.status(400).send({ err });
          }
        
      } else {
        res.status(403).json({ error: "Unauthorized" });
      }
}

module.exports = {
    hashPassword,
    comparePassword,
    getToken,
    verifyToken
};