const db = require("../models");
const user = db.User;

module.exports = {
    getOne: async (req, res) => {
      try {
        const { id } = req.params;
        const response = await user.findOne({
          where: { id: id },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
          raw: true,
        });
        return res.status(200).send(response);
      } catch (error) {
        return res.status(400).send(error);
      }
    },
}