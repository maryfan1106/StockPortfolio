const pool = require("./pool");

const getUserTransactions = async (id) => {
    if (!id) {
        throw "Missing id";
    }
    const result = await pool.query(
        `SELECT transtype, symbol, shares, price 
        FROM transactions
        WHERE uid = ${id}
        `
    );
    return result.rows;
};

module.exports = {
    getUserTransactions,
};