const mysql = require('promise-mysql');

const database = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'acception',
    database : 'ecommerce'
})

// database.connect();

module.exports = database;