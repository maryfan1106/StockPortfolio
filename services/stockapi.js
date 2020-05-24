const axios = require('axios');
const { backOff } =  require('exponential-backoff');

const getStockInfo = async (symbol) => {
    // timeout function to resolve pending promise
    // function timeout(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    console.log(symbol)
    try {
        // // set timeout to limit requests
        // await timeout(500);
        // make get request for open and lastestPrice
        // use exponential backoff as recommended by external api documentation
        const response = await backOff(() => axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/quote/?filter=symbol,open,latestPrice&token=${process.env.API_KEY}`));
        const { data } = await response;
        console.log(data);
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
        console.log(err);
        throw("Invalid ticker symbol");
    }
};

const calculatePerformance = (stockInfo) => {
    const { open, latestPrice } = stockInfo;
    if (latestPrice<open) {
        // display red
        return 'negative';
    } else if (latestPrice>open) {
        // display green
        return 'positive';
    } else {
        // display grey
        return 'equal';
    }
};

module.exports = {
    getStockInfo,
    calculatePerformance
};