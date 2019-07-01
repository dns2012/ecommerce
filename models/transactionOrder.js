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
    },

    getOrderBySeller : (sellerId, status, callback) => {
        var transactionOrder, transactionOrderProduct;
        let sql = `SELECT transaction_order.*, user.name, user.image FROM 
                  transaction_order INNER JOIN transaction ON transaction.id =
                  transaction_order.transaction_id INNER JOIN user ON user.id =
                  transaction.user_id WHERE transaction_order.seller_id=? AND 
                  transaction_order.status=?`;
        database.query(sql, [sellerId, status])
        .then(rows => {
            transactionOrder = rows;
            var transationOrderId = [];
            if(transactionOrder.length > 0) {
                for(var i in rows) {
                    transationOrderId.push(rows[i].id);
                }
            } else {
                transationOrderId.push(0);
            }
            let sql = `SELECT transaction_order_product.*, product.name, product_image.name as image
                      FROM transaction_order_product INNER JOIN product ON product.id = 
                      transaction_order_product.product_id INNER JOIN product_image ON
                      product_image.product_id = product.id WHERE transaction_order_product.transaction_order_id
                      IN (?)`;
            return database.query(sql, [transationOrderId])
        })
        .then(rows => {
            transactionOrderProduct = rows;
            let object = {
                transactionOrder : transactionOrder,
                transactionOrderProduct : transactionOrderProduct
            }
            callback(object)
        })
    },

    getOrderDetailBySeller : (orderId, callback) => {
        var transactionOrder, transactionOrderProduct;
        let sql = `SELECT transaction_order.*, user.name, user.image FROM 
                  transaction_order INNER JOIN transaction ON transaction.id =
                  transaction_order.transaction_id INNER JOIN user ON user.id =
                  transaction.user_id WHERE transaction_order.id = ?`;
        database.query(sql, [orderId])
        .then(rows => {
            transactionOrder = rows;
            let sql = `SELECT transaction_order_product.*, product.name, product_image.name as image
                      FROM transaction_order_product INNER JOIN product ON product.id = 
                      transaction_order_product.product_id INNER JOIN product_image ON
                      product_image.product_id = product.id WHERE transaction_order_product.transaction_order_id=?`;
            return database.query(sql, [orderId])
        })
        .then(rows => {
            transactionOrderProduct = rows;
            let object = {
                transactionOrder : transactionOrder,
                transactionOrderProduct : transactionOrderProduct
            }
            callback(object)
        })
    },

    updateTransactionOrder : (orderId, object, callback) => {
        let sql = `UPDATE transaction_order SET ? WHERE id=?`;
        database.query(sql, [object, orderId])
        .then(rows => {
            callback("success")
        })
        .catch(error => {
            callback("error");
        })
    }
}