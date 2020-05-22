const pool = require("./pool");

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

    const result = await pool.query(
        `INSERT INTO users (email, pwhash) 
        VALUES ($1, $2)
        `,
        [email, password]
    );
    return result;
};

module.exports = {
    getUserById,
    insertUser
};