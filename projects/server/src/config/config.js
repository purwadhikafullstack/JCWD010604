
const ck = require("ckey")

module.exports = {
  development: {
    username: ck.USER_DB,
    password: ck.PASS_DB,
    database: ck.SOURCE_DB,
    // host: HOST_POD,
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: ck.USER_DB_POD,
    password: ck.PASSWORD_DB_POD,
    database: ck.SOURCE_DB_POD,
    host: ck.HOST_POD,
    dialect: "mysql",
  },
};
