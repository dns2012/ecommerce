const database  = require("../database");

module.exports = {
    addCart : (object, callback) => {
        let sql = `INSERT INTO cart SET ?`;
        database.query(sql, object)
        .then(rows => {
            callback(rows.insertId);
        })
        .catch(error => {
            callback("error");
        })
    },

    getByUserAndProduct : (userId, productId, callback) => {
        let sql = `SELECT * FROM cart WHERE user_id=? AND product_id=?`;
        database.query(sql, [userId, productId])
        .then(rows => {
            callback(rows)
        })
    },

    updateCart : (cartId, object, callback) => {
        let sql = `UPDATE cart SET ? WHERE id=?`;
        database.query(sql, [object, cartId])
        .then(rows => {
            callback("success");
        })
        .catch(error => {
            callback("error");
        })
    },

    getByUser : (userId, callback) => {
        let sql = `SELECT cart.id as cart_id, cart.quantity, product.name as product_name, product.price,
                  seller.image as seller_image, seller.id as seller_id, seller.name as seller_name, 
                  product_image.name as product_image FROM cart INNER JOIN product
                  ON product.id = cart.product_id INNER JOIN seller
                  ON seller.id = product.seller_id INNER JOIN product_image
                  ON product_image.id = product.id WHERE cart.user_id=?`;
        database.query(sql, [userId])
        .then(rows => {
            callback(rows)
        })
    },
}