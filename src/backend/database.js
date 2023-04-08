require("dotenv").config();

// create connection
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,

  },
  pool: { min: 0, max: 7 },
});

// Check that the connection works
knex.raw("SELECT VERSION()").then(() => {
  console.log(`connection to db successful!`);
});

module.exports = knex;
