require('dotenv').config();

const knex = require("knex")
module.exports ={
  knexBuilder : knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      
    },
  })
}