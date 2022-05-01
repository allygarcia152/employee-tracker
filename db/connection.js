const mysql = require('mysql2');

// create connection to server
const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'Ramen&Noodle',
  database: 'management'
});

module.exports = db;