const express = require("express");
const router = express.Router();
const { getTransactions, makeTransaction } = require("../controllers/transactions");
const { verifyToken } = require("../services/util");

router.get("/", verifyToken, getTransactions);
router.post("/", verifyToken, makeTransaction);

module.exports = router;