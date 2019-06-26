const database  = require("../database");

module.exports = {
    addProductAttribute : (object) => {
        let sql = `INSERT INTO product_attribute SET ?`;
        database.query(sql, [object])
    }
}