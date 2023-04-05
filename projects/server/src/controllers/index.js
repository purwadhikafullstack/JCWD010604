const user = require("./userController");
const userProfile = require("./userProfile")
const admin = require("./adminController");
const rajaOngkir = require("./rajaOngkirController")
const userAddress = require("./user_address")
const orderList = require("./orderListController")

module.exports = {
    user,
    userProfile,
    admin,
    rajaOngkir,
    userAddress,
    orderList
  };
  