const user = require("./userRoute");
const userProfile = require("./userProfileRoute");
const admin = require("./adminRoutes");
const rajaOngkir = require("./rajaOngkirRoute")
const userAddress = require("./user_address");
const orderList = require("./orderListRouter");

module.exports = {
  user,
  userProfile,
  admin,
  rajaOngkir,
  userAddress,
  orderList
};
