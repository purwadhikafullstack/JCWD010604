const jwt = require("jsonwebtoken");
const key = `${process.env.OKAI_SECRET}`;

module.exports = {
  checkAuth: async (req, res, next) => {
    try {
      let token = req.headers.authorization;

      if (!token) throw "your token is empty";

      token = token.split(" ")[1];

      if (token === "null" || !token) throw "Unauthorized Request";

      let verifiedUser = jwt.verify(token, key);

      if (!verifiedUser) throw "Verify token failed";

      if (verifiedUser.role === 1) {
        throw "Unauthorized Request Admin";
      }

      req.role = verifiedUser.role;

      next();
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
