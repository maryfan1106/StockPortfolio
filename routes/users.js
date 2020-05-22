const express = require("express");
const router = express.Router();
const { getUser, createUser } = require("../controllers/users");

router.get("/", getUser);
router.post("/signup", createUser);

module.exports = router;