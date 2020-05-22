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

const insertTransaction = async (req) => {
    const { transtype, symbol, shares, price } = req.body;
    if (!transtype || !symbol || !shares || !price) {
        throw "Missing required field";
    }

    try{
        const result = await pool.query(
            `INSERT INTO transactions (uid, transtype, symbol, shares, price)
            VALUES ($1, $2, $3, $4, $5)
            `,
            [req.user.uid, transtype, symbol, shares, price]
        );
        return result;
    } catch(error) {
        throw error;
    }
};

module.exports = {
    getUserTransactions,
    insertTransaction
};