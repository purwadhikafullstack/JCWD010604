const db = require("../../models");
const { Op } = require("sequelize");
const mutation = db.Stock_Mutation;
const warehouse = db.Warehouse;
const productWarehouses = db.Product_Warehouses;
const product = db.Product;
const journal = db.Journal;

module.exports = {
  allMutation: async (req, res) => {
    try {
      if (req.role === 1) {
        throw "Unauthorize Access";
      }

      const { search, sort, direction, pagination, userId } = req.query;

      const allWarehouse = await warehouse.findAll();
      const allProducts = await product.findAll();

      const warehouseId = await warehouse.findOne({
        where: {
          UserId: userId,
        },
        attributes: {
          exclude: [
            "UserId",
            "province",
            "city",
            "postal_code",
            "createdAt",
            "updatedAt",
          ],
        },
        raw: true,
      });

      if (+req.role === 2) {
        const { count, rows } = await mutation.findAndCountAll({
          where: {
            IdWarehouseFrom: warehouseId ? warehouseId.id : null,
            invoice: {
              [Op.like]: `%${search}%`,
            },
          },
          order: [[sort ? sort : "id", direction ? direction : "ASC"]],
          limit: 10,
          offset: pagination ? +pagination * 10 : 0,
        });

        return res.status(200).send({
          pages: Math.ceil(count / 10),
          result: rows,
          warehouse: warehouseId,
          allWarehouse,
          allProducts,
        });
      }

      if (+req.role === 3) {
        const { count, rows } = await mutation.findAndCountAll({
          where: {
            invoice: {
              [Op.like]: `%${search}%`,
            },
          },
          order: [[sort ? sort : "id", direction ? direction : "ASC"]],
          limit: 10,
          offset: pagination ? +pagination * 10 : 0,
        });

        return res.status(200).send({
          pages: Math.ceil(count / 10),
          result: rows,
          warehouse: warehouseId,
          allWarehouse,
          allProducts,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  },
  addMutation: async (req, res) => {
    try {
      if (req.role === 1) {
        throw "Unauthorize Access";
      }

      const { IdWarehouseTo, IdWarehouseFrom, ProductId, quantity } = req.body;

      const time = new Date();

      await mutation.create({
        IdWarehouseTo,
        IdWarehouseFrom,
        ProductId,
        invoice:
          time.getDate() +
          (time.getMonth() + 1) +
          time.getFullYear() +
          time.getHours() +
          time.getMinutes() +
          time.getSeconds(),
        quantity,
      });

      res.status(200).send("Mutation Added");
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  },
  approvalMutation: async (req, res) => {
    try {
      if (req.role === 1) {
        throw "Unauthorize Access";
      }

      const { WarehouseIdFrom, WarehouseIdTo, ProductId } = req.query;
      const { approval } = req.body;

      const getQuantity = await mutation.findOne({
        where: {
          id: req.params.id,
        },
        attributes: {
          exclude: [
            "IdWarehouseTo",
            "IdWarehouseFrom",
            "approval",
            "invoice",
            "createdAt",
            "updatedAt",
            "ProductId",
          ],
        },
        raw: true,
      });

      const quantity = getQuantity.quantity;

      const stocksWarehouseFrom = await productWarehouses.findOne({
        where: {
          ProductId,
          WarehouseId: WarehouseIdFrom,
        },
        raw: true,
      });

      const stocksWarehouseTo = await productWarehouses.findOne({
        where: {
          ProductId,
          WarehouseId: WarehouseIdTo,
        },
        raw: true,
      });

      const stocksFrom = stocksWarehouseFrom?.stocks;
      const stocksTo = stocksWarehouseTo?.stocks;

      if (approval === 0) {
        await mutation.destroy({
          where: {
            id: req.params.id,
          },
        });

        res.status(200).send("Request Denied");
      } else {
        if (stocksFrom < +quantity) {
          return res.status(400).send("Stocks are less than requested");
        }

        await mutation.update(
          { approval },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        await productWarehouses.update(
          { stocks: +stocksFrom - +quantity },
          {
            where: {
              WarehouseId: WarehouseIdFrom,
              ProductId,
            },
          }
        );

        await productWarehouses.update(
          { stocks: +stocksTo + +quantity },
          {
            where: {
              WarehouseId: WarehouseIdTo,
              ProductId,
            },
          }
        );

        await journal.create({
          stock_before: stocksFrom,
          stock_after: +stocksFrom - +quantity,
          desc: "Mutation Update",
          StockMutationId: req.params.id,
          JournalTypeId: 4,
          ProductId,
          WarehouseId: WarehouseIdFrom,
        });

        await journal.create({
          stock_before: stocksTo,
          stock_after: +stocksTo + +quantity,
          desc: "Mutation Update",
          StockMutationId: req.params.id,
          JournalTypeId: 3,
          ProductId,
          WarehouseId: WarehouseIdTo,
        });

        res.status(200).send("Request Accepted");
      }
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  },
  deleteMutation: async (req, res) => {
    try {
      const { IdWarehouseTo } = req.query;

      if (req.role === 1) {
        throw "Unauthorize Access";
      }

      await mutation.destroy({
        where: {
          IdWarehouseTo,
        },
      });

      res.status(200).send("Delete Success");
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  },
};
