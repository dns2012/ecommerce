const database  = require("../database");

const databasePromise = require("../database-promise");

module.exports = {
    getById : (id, callback) => {
        let product, productSpecification;
        let query = `SELECT * FROM product WHERE id=?`;
        databasePromise.query(query, [id])
        .then(rows => {
            product = rows;
            return databasePromise.query(`SELECT * FROM product_specification 
            WHERE product_id=?`, [id])
        })
        .then(rows => {
            productSpecification = rows
            return productSpecification;
        })
        .then(() => {
            let obj = {
                product : product[0],
                productSpecification : productSpecification
            }
            callback(obj)
        })
    }
}