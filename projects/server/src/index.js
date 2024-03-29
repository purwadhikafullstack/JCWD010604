const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
//require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const db = require("./models");
const bearerToken = require("express-bearer-token");
const rajaOngkir = require("./routes/rajaOngkirRoute");
const {
  user,
  userProfile,
  userAddress,
  admin,
  orderList,
} = require("./routes");
const {
  userComp,
  warehouseComp,
  productComp,
  categoryComp,
  userOrderList,
  stocksComp,
  mutationComp,
  journalComp,
  // salesAdmin,
} = admin;
const { getProduct } = require("./routes/product");


const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
// app.use(
//   cors({
//     origin: [
//       process.env.WHITELISTED_DOMAIN &&
//         process.env.WHITELISTED_DOMAIN.split(","),
//     ],
//   })
// );

app.use(express.json());
app.use(bearerToken());
app.use("/public", express.static(path.join(__dirname, "public")));

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// user
app.use("/api", user);
app.use("/api", userProfile);
app.use("/api", userAddress);
app.use("/api", getProduct);
app.use("/api", orderList);
// app.use("/api", cart);
// app.use("/api", shipment);

// admin
app.use(
  "/api",
  userComp,
  warehouseComp,
  rajaOngkir,
  productComp,
  categoryComp,
  userOrderList,
  stocksComp,
  mutationComp,
   journalComp,
  // salesAdmin
);
// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
    // db.sequelize.sync({ alter: true });
  }
  
});
