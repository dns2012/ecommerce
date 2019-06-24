const database  = require("../database");

const moment    = require("moment");

module.exports = {
    addTransactionOrder : (object, product, userId, callback) => {
        let sql = `INSERT INTO transaction_order SET ?`;
        database.query(sql, [object])
        .then(rows => {
            for(var i in product) {
                var productId = product[i].productId;
                var price = product[i].price;
                var quantity = product[i].quantity;
                var subtotal = product[i].subtotal;
                var attribute = JSON.stringify(product[i].attribute);
                var createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
                var productObject = {
                    id  : 0,
                    transaction_order_id : rows.insertId,
                    product_id : productId,
                    price : price,
                    quantity : quantity,
                    subtotal : subtotal,
                    attribute : attribute,
                    created_at : createdAt
                };
                var sqlProduct = `INSERT INTO transaction_order_product SET ?`;
                database.query(sqlProduct, productObject);
                var sqlProductMinQty = `UPDATE product SET quantity = quantity-? WHERE id=?`;
                database.query(sqlProductMinQty, [quantity, productId]);
                var sqlCartDelete = `DELETE FROM cart WHERE product_id=? AND user_id=?`;
                database.query(sqlCartDelete, [productId, userId]);
            }
            callback(rows.insertId);
        })
        .catch(error => {
            callback("error")
        })
    }
}