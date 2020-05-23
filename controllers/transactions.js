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
      insertTransaction(request, info) 
      .then((transaction) => {
        response.status(201).json({ transaction });
      })
      .catch((error) =>
      response.status(400).json({ error })
      );
    })
    .catch((error) =>
    response.status(400).json({ error })
    );
};

module.exports = {
    getTransactions,
    makeTransaction
};