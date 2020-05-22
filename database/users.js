const pool = require("./pool");
const { hashPassword } = require("../services/util");

const getUserById = async (id) => {
    const result = await pool.query(
        `SELECT uid, email, pwhash 
        FROM users
        WHERE uid = ${id}
        `
    );
    return result.rows[0];
};

const insertUser = async (user) => {
    const { email, password } = user;
    if (!email || !password) {
        throw "Missing required field";
    }

    const pwhash = hashPassword(password);

    try{
        const result = await pool.query(
            `INSERT INTO users (email, pwhash) 
            VALUES ($1, $2)
            `,
            [email, pwhash]
        );
        return result;
    } catch(error) {
        throw "Email is already registered";
    }
};

module.exports = {
    getUserById,
    insertUser
};