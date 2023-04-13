const express = require("express");
const router = express.Router();
const { tokenVerifier, checkToken } = require("../middleware/tokenVerifier");

const { user } = require("../controllers/index");

router.post("/user/login", user.login);
router.post("/user/register", user.register);
router.get("/user/verification", checkToken, user.verification);
// router.get("/user/verification",  user.verification);
router.get("/user/keeplogin", tokenVerifier, user.keeplogin);
router.post("/user/setpass", user.setpass);
router.post("/user/emailresetpass", user.emailResetPass);
router.post("/user/resetpassword", user.resetpassword);


module.exports = router;
