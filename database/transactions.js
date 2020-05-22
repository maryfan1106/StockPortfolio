const pool = require("./pool");

const getUserTransactions = async (uid) => {
    if (!uid) {
        throw "Missing uid";
    }
    const result = await pool.query(
        `SELECT transtype, symbol, shares, price 
        FROM transactions
        WHERE uid = ${uid}
        `
    );
    return result.rows;
};

module.exports = {
    getUserTransactions,
};