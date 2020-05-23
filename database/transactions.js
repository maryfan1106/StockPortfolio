const pool = require("./pool");
const { getAccountBalance } = require("../database/users");

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
    const { symbol, latestPrice } = info;
    const result = await getAccountBalance(req.user.uid);
    const { accountbalance } = result;

    if ( shares < 0 || !Number.isInteger(shares) ) {
        throw "Number of shares must be a positive integer";
    }

    const newBalance = accountbalance - (latestPrice * shares);
    if (newBalance < 0) {
        throw "Not enough money";
    }

    // use transaction in case failure
    try{
        await pool.query('BEGIN');
        // take money out from accountbalance
        await pool.query(
            `UPDATE users 
            SET accountbalance = $2
            WHERE uid = $1
            `,
            [req.user.uid, newBalance]
        );
        // add transaction
        await pool.query(
            `INSERT INTO transactions (uid, transtype, symbol, shares, price)
            VALUES ($1, $2, $3, $4, $5)
            `,
            [req.user.uid, transtype, symbol, shares, latestPrice]
        );
        // add to stock portfolio
        await pool.query(
            `WITH upsert AS (
                UPDATE stocks SET totalshares = totalshares + $3
                WHERE uid=$1 AND symbol=$2 
                RETURNING *
            )
            INSERT INTO stocks (uid, symbol, totalshares) 
            SELECT $1, $2, $3
            WHERE NOT EXISTS (SELECT * FROM upsert);
            `,
            [req.user.uid, symbol, shares]
        );
        await pool.query('COMMIT')
        return "Successfully made transaction";
    } catch(error) {
        await pool.query('ROLLBACK')
        console.log(error);
        throw "Could not make transaction at this time";
    }
};

module.exports = {
    getUserTransactions,
    insertTransaction
};