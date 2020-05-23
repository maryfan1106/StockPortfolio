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

module.exports = {
    getStockInfo,
};