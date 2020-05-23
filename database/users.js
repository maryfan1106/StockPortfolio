const pool = require("./pool");
const { hashPassword } = require("../services/util");
const { getStockInfo, calculatePerformance } = require("../services/stockapi");

const getAccountBalance = async (uid) => {
    const result = await pool.query(
        `SELECT accountbalance
        FROM users
        WHERE uid = ${uid}
        `
    );
    return result.rows[0];
}

const getStocks = async (uid) => {
    const result = await pool.query(
        `SELECT symbol, totalshares
        FROM stocks
        WHERE uid = ${uid}
        `
    );
    return result.rows;
}

const getAccountInfo = async (uid) => {
    const { accountbalance } = await getAccountBalance(uid);
    const accountStocks = await getStocks(uid);
    const stocks = await Promise.all( accountStocks.map(async (stock) => {
        const stockInfo = await getStockInfo(stock.symbol);
        const performance = calculatePerformance(stockInfo);
        const value = (stock.totalshares * stockInfo.latestPrice).toFixed(2);
        stock.value = value;
        stock.performance = performance;
        return stock;
    }));

    return { accountbalance, stocks };
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
    getStocks,
    getAccountInfo,
    getUserById,
    getUserByEmail,
    insertUser
};