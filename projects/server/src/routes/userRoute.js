const express = require("express")
const router = express.Router();

const { user } = require("../controllers/index");

router.post("/user/login", user.login);

module.exports = router;