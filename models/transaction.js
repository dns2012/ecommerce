const database  = require("../database");

module.exports = {
    addTransaction : (object, callback) => {
        let sql = `INSERT INTO transaction SET ?`;
        database.query(sql, [object])
        .then(rows => {
            callback(rows.insertId);
        })
        .catch(error => {
            callback("error");
        })
    },

    getByTransaction : (transactionId, callback) => {
        let transaction_details, customer_details, item_details;
        let sql = `SELECT transaction.id, transaction.total, user.name, user.email,
                  user.phone FROM transaction INNER JOIN user ON user.id = transaction.user_id
                  WHERE transaction.id=?`;
        database.query(sql, [transactionId])
        .then(rows => {
            transaction_details = {
                order_id : rows[0].id,
                gross_amount : rows[0].total
            }
            customer_details = {
                email : rows[0].email,
                first_name : rows[0].name,
                last_name : "",
                phone : rows[0].phone
            }
            let sqlTransactionOrder = `SELECT product.id, product.name, transaction_order_product.quantity,
                                      transaction_order_product.price FROM transaction_order INNER JOIN transaction_order_product
                                      ON transaction_order_product.transaction_order_id = transaction_order.id INNER JOIN product
                                      ON product.id = transaction_order_product.product_id WHERE transaction_order.transaction_id=?`;
            return database.query(sqlTransactionOrder, [transactionId])
        })
        .then(rows => {
            item_details = rows;
            let sqlTransactionOrderOngkir = `SELECT expedition FROM transaction_order WHERE transaction_id=?`;
            return database.query(sqlTransactionOrderOngkir, [transactionId]);
        })
        .then(rows => {
            for(var i in rows) {
                let expedition = JSON.parse(rows[i].expedition);
                var shiping = {
                    id : expedition.code,
                    name : expedition.name + ' ' + expedition.service,
                    quantity : 1,
                    price : expedition.cost
                }
                item_details.push(shiping)
            }
            let orderObject = {
                transaction_details : transaction_details,
                customer_details : customer_details,
                item_details : item_details
            }
            callback(orderObject);
        })
    },

    updateTransactionPayment : (payment, paymentAttribute, transactionId, callback) => {
        let sql = `UPDATE transaction SET payment=?, payment_attribute=?
                  WHERE id=?`
        database.query(sql, [payment, paymentAttribute, transactionId]);
    }
}