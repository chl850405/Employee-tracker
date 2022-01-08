//import sequelize constructor from library
require("mysql2");

const dotenv = require("dotenv");
dotenv.config();

const username = process.env.DB_USER;

const password = process.env.DB_PW;
//create connection to our database, pass in your MySQL information user for user name and password
const connection = () => (username, password, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  database: "employee_tracker_db"
});

module.exports = connection;