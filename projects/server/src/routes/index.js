const user = require("./userRoute");
const userProfile = require("./userProfileRoute");
const admin = require("./adminRoutes");
const rajaOngkir = require("./rajaOngkirRoute")
const userAddress = require("./user_address");

module.exports = {
  user,
  userProfile,
  admin,
  rajaOngkir,
  userAddress
};
