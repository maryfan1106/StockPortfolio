const express = require("express");
const router = express.Router();
const { getTransactions } = require("../controllers/transactions");
const { verifyToken } = require("../services/util");

router.get("/", verifyToken, getTransactions);

module.exports = router;