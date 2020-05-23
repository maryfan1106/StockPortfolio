const express = require("express");
const router = express.Router();
const { getUserInfo, createUser, loginUser } = require("../controllers/users");
const { verifyToken } = require("../services/util");

router.get("/", verifyToken, getUserInfo);
router.post("/signup", createUser);
router.post("/login", loginUser);

module.exports = router;