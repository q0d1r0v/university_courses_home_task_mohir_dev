const { Pool } = require("pg");

const pool = new Pool({
  user: "user",
  host: "host",
  database: "db_name",
  password: "db_password",
  port: 5432,
});

const query = (text, params, callback) => pool.query(text, params, callback);

module.exports = {
  query,
};
