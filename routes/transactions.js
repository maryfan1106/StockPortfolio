const express = require("express");
const router = express.Router();
const { getTransactions } = require("../controllers/transactions");

router.get("/", getTransactions);

module.exports = router;