const { getUserTransactions, insertTransaction } = require("../database/transactions");
const { getStockInfo } = require("../services/stockapi");

const getTransactions = async (request, response) => {
    getUserTransactions(request.user.uid)
    .then((transactions) => {
        response.status(302).json({ transactions });
      })
      .catch((error) =>
        response.status(404).json({ error })
      );
};

const makeTransaction = async (request, response) => {
    getStockInfo(request.body.symbol)
    .then((info) => {
      const { symbol, open, latestPrice } = info;
      response.status(200).json({ symbol, open, latestPrice });
    })
    .catch((error) =>
    response.status(400).json({ error })
    );
};

// const makeTransaction = async (request, response) => {
//   insertTransaction(request)
//   .then((transaction) => {
//       response.status(201).json({ transaction });
//     })
//     .catch((error) =>
//       response.status(400).json({ error })
//     );
// };

module.exports = {
    getTransactions,
    makeTransaction
};