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

const insertTransaction = async (req, info) => {
    const { transtype, shares } = req.body;
    if (!transtype || !shares) {
        throw "Missing required field";
    }

    const { symbol, open, latestPrice } = info;

    try{
        const result = await pool.query(
            `INSERT INTO transactions (uid, transtype, symbol, shares, price)
            VALUES ($1, $2, $3, $4, $5)
            `,
            [req.user.uid, transtype, symbol, shares, latestPrice]
        );
        return result;
    } catch(error) {
        console.log(error);
        // transtype: enum 'BUY', 'SELL'
        // throw "Invalid transaction type";
        // shares: integer
        throw "Number of shares must be an integer";
    }
};

module.exports = {
    getUserTransactions,
    insertTransaction
};