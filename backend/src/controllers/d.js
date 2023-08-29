
const mysql = require('mysql');
const util = require('util'); 

const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      charset: 'tis620',
});
// Promisify the connection.query method
const queryPromise = util.promisify(connection.query).bind(connection);

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error.message);
  } else {
    connection.query("SET NAMES UTF8")
    console.log('Connected to the database');
  }
});

module.exports = {
  queryPromise,
  connection,
  // ... other exports if needed
};