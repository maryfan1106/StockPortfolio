const pool = require("./pool");
const { hashPassword } = require("../services/util");

const getAccountBalance = async (uid) => {
    const result = await pool.query(
        `SELECT accountbalance
        FROM users
        WHERE uid = ${uid}
        `
    );
    return result.rows[0];
}

const getUserById = async (id) => {
    const result = await pool.query(
        `SELECT uid, email, pwhash 
        FROM users
        WHERE uid = ${id}
        `
    );
    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const result = await pool.query(
        `SELECT uid, email, pwhash 
        FROM users
        WHERE email = $1
        `,
        [email]
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
        await pool.query(
            `INSERT INTO users (email, pwhash) 
            VALUES ($1, $2)
            `,
            [email, pwhash]
        );
        return getUserByEmail(email);
    } catch(error) {
        throw "Email is already registered";
    }
};

module.exports = {
    getAccountBalance,
    getUserById,
    getUserByEmail,
    insertUser
};