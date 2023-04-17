const axios = require("axios");
const { Op } = require("sequelize");
const db = require("../../models");
const warehouse = db.Warehouse;
const GEOAPIFY_KEY = "2717d15c268e4de1bd419ae63e42c9c7"
const GEOAPIFY_KEY_URL = "https://api.geoapify.com/v1/geocode"

const WAREHOUSE_PER_PAGE = 10;

async function getWarehouseList(search, sort, direction, pagination) {
  const { count, rows } = await warehouse.findAndCountAll({
    where: {
      warehouse_name: {
        [Op.like]: `%${search}%`,
      },
    },
    order: [[sort ? sort : "id", direction ? direction : "ASC"]],
    limit: WAREHOUSE_PER_PAGE,
    offset: pagination ? +pagination * WAREHOUSE_PER_PAGE : 0,
    raw: true,
  });
  return { pages: Math.ceil(count / WAREHOUSE_PER_PAGE), result: rows };
}

async function updateWarehouse(id, newData) {
  await warehouse.update(newData, { where: { id } });
}

async function addWarehouse(warehouseData) {
  const { warehouse_name, province, province_id, city, city_id, postal_code, UserId } = warehouseData;

  const forwardAddress = await axios.get(`${GEOAPIFY_KEY_URL}/search?postcode=${postal_code}&city=${city}&province=${province}&limit=1&format=json&apiKey=${GEOAPIFY_KEY}`, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });
  const { lon, lat } = forwardAddress.data.results[0];
  const result = await warehouse.create({ warehouse_name, province, province_id, city, city_id, postal_code, UserId, lat: +lon, lng: +lat });
  return result;
}

async function deleteWarehouse(id) {
  await warehouse.destroy({ where: { id } });
}

module.exports = {
  async allWarehouse(req, res) {
    try {
      if (req.role === 1) {
        throw "Unauthorize Access";
      }

      const { search, sort, direction, pagination } = req.query;
      const warehouseList = await getWarehouseList(search, sort, direction, pagination);

      res.status(200).send(warehouseList);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  async editWarehouse(req, res) {
    try {
      if (req.role === 1 || req.role === 2) {
        throw "Unauthorize Access";
      }

      await updateWarehouse(req.params.id, req.body);
      res.status(200).send("Edit Warehouse Success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  async addWarehouse(req, res) {
    try {
      if (req.role === 1 || req.role === 2) {
        throw "Unauthorize Access";
      }

      const result = await addWarehouse(req.body);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  async deleteWarehouse(req, res) {
    try {
      if (req.role === 1 || req.role === 2) {
        throw "Unauthorize Access";
      }

      await deleteWarehouse(req.params.id);
      res.status(200).send("Warehouse Deleted");
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
