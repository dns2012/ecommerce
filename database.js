const mysql = require('promise-mysql');

require("dotenv").config();

const database = mysql.createPool({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME
})

// database.connect();

module.exports = database;
