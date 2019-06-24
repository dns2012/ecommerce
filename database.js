const mysql = require('promise-mysql');

const database = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Php7.0Native',
    database : 'ecommerce'
})

// database.connect();

module.exports = database;
