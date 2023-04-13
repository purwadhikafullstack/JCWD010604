// const db = require("../../models");
// const { Op } = require("sequelize");
// const Sequelize = require("sequelize");

// const Product = db.Product;
// const productCategory = db.Product_Category;
// const productImage = db.Product_Image;
// const productWarehouses = db.Product_Warehouses;

// module.exports = {
  
//   homeProduct: async (req, res) => {
//     try {
//       const length = await Product.count();
//       const offset = Math.floor(Math.random() * length - 12);
//       const all = await Product.findAll({
//         include: [
//           {
//             model: productImage,
//             attributes: ["image"],
//             required: true,
//           },
//         ],
//         attributes: ["id", "name", "desc", "price", "weight"],
//         offset: offset < 0 ? 1 : offset,
//         limit: 12,
//       });

//       res.status(200).send({
//         result: all,
//       });
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   },
//   homeCategory: async (req, res) => {
//     try {
//       const category = await productCategory.findAll({
//         attributes: { exclude: ["createdAt", "updatedAt"] },
//         raw: true,
//       });

//       res.status(200).send({
//         result: category,
//       });
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   },
// };
