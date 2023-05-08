const rajaOngkirKey = "703358fc61aafc6971952c63f0d4f301" // `${process.env.RAJA_ONGKIR}`;
const url = "https://api.rajaongkir.com/starter" //`${process.env.RAJA_ONGKIR_URL}`;

const axios = require("axios");

module.exports = {
  getProvince: async (req, res) => {
    try {
      const response = await (
        await axios.get(`${url}/province`, {
          headers: {
            key: rajaOngkirKey,
             "content-type": "application/x-www-form-urlencoded",
          },
        })
      ).data;

      return res
        .status(200)
        .json({ raw: response, result: response.rajaongkir.results });
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
  },
  getCity: async (req, res) => {
    try {
      const { province_id } = req.params;
      const response = await (
        await axios.get(`${url}/city?province=${province_id}`, {
          headers: {
            key: rajaOngkirKey,
            "content-type": "application/x-www-form-urlencoded",
          },
        })
      ).data;

      return res
        .status(200)
        .json({ raw: response, result: response.rajaongkir.results });
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
  },
};
