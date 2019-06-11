const database  = require("../database");

module.exports = {
    getByUserId : (id, callback) => {
        let sql = `SELECT product_wishlist.id as wistlist_id, product.*
                  FROM product_wishlist INNER JOIN product ON product.id = 
                  product_wishlist.product_id WHERE product_wishlist.user_id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows);
        })
    },

    addWishlist : (object, callback) => {
        let sql = `INSERT INTO product_wishlist SET ?`;
        database.query(sql, object)
        .then(rows => {
            callback("success")
        })
        .catch(error => {
            callback(error)
        })
    },

    deleteWishlist : (id, callback) => {
        let sql = `DELETE FROM product_wishlist WHERE id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback("success");
        })
        .catch(error => {
            callback(error);
        })
    },

    checkWishlist : (productId, userId, callback) => {
        let sql = `SELECT COUNT(*) as wishlist FROM product_wishlist
                  WHERE product_id=? AND user_id=?`;
        database.query(sql, [productId, userId])
        .then(rows => {
            callback(rows[0].wishlist)
        })
    }
}