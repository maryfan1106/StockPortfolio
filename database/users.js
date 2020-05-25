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
    // probably shouldn't return as one object but they're all connected, future development: separate and use different errorHandlers
    let portfolioValue = 0;
    const { accountbalance } = await getAccountBalance(uid);
    const accountStocks = await getStocks(uid);

    const stocks = await Promise.all( accountStocks.map(async (stock) => {
        // for each stock owned find the value and performace
        // external api error: status 429 too many requests (after 4th hit)
        const stockInfo = await getStockInfo(stock.symbol);
        const performance = calculatePerformance(stockInfo);
        const value = stockInfo.latestPrice;
        stock.value = value;
        stock.performance = performance;
        portfolioValue += stock.totalshares * value;
        return stock;
    }));
    portfolioValue=portfolioValue.toFixed(2);

    return { accountbalance, portfolioValue, stocks };
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