const database  = require("../database");

module.exports = {
    getAll : (callback) => {
        let sql = `SELECT * FROM category_sector`;
        database.query(sql)
        .then(rows => {
            callback(rows)
        })
    }
}