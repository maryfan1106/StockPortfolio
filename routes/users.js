const express = require("express");
const router = express.Router();
const { getUser, createUser, loginUser } = require("../controllers/users");

router.get("/", getUser);
router.post("/signup", createUser);
router.post("/login", loginUser);

module.exports = router;