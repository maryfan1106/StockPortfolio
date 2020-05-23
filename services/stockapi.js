const axios = require('axios');

const getStockInfo = async (symbol) => {
    try {
        // make get request for open and lastestPrice
        const response = await axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/quote/?filter=symbol,open,latestPrice&token=${process.env.API_KEY}`);
        const { data } = await response;
        // if open is null
        if (!data.open) {
            // make get request for previous open
            const response1 = await axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/previous?filter=open&token=${process.env.API_KEY}`);
            const { open } = await response1.data;
            // return previous open
            data.open = open;
        }
        return data;
    } catch (err) {
        throw("Invalid ticker symbol");
    }
};

const calculatePerformance = (stockInfo) => {
    const { open, latestPrice } = stockInfo;
    if (latestPrice<open) {
        // display red
        return 0;
    } else if (latestPrice>open) {
        // display green
        return 2;
    } else {
        // display grey
        return 1;
    }
};

module.exports = {
    getStockInfo,
    calculatePerformance
};