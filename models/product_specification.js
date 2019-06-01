const database  = require("../database");

module.exports = {
    getByProductId : (id, callback) => {
        let query = `SELECT * FROM product_specification WHERE product_id=?`;
        database.query(query, [id])
        .then(rows => {
            callback(rows)
        })
    }
}