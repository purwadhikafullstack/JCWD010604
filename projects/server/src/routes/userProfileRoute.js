const express = require("express")
const router = express.Router();

const {userProfile} = require("../controllers")

router.get("/user/:id", userProfile.getOne);

module.exports = router;