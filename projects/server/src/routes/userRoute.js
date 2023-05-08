const express = require("express")
const router = express.Router();
const { tokenVerifier } = require("../middleware/tokenVerifier")

const { user } = require("../controllers/index");

router.post("/user/login", user.login);
router.get("/user/keeplogin", tokenVerifier, user.keeplogin)

module.exports = router;