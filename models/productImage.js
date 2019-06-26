const database  = require("../database");

module.exports = {
    addProductImage : (object) => {
        let sql = `INSERT INTO product_image SET ?`;
        database.query(sql, [object])
    }
}