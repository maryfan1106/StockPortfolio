const { getUserTransactions } = require("../database/transactions");

const getTransactions = async (request, response) => {
    getUserTransactions(request.user.uid)
    .then((transactions) => {
        response.status(301).json({ transactions });
      })
      .catch((error) =>
        response.status(404).json({ error })
      );
};

module.exports = {
    getTransactions
};