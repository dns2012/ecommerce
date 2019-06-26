const database  = require("../database");

module.exports = {
    addProductSpecification : (object) => {
        let sql = `INSERT INTO product_specification SET ?`;
        database.query(sql, [object])
    }
}