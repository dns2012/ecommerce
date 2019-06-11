const database  = require("../database");

module.exports =  {
    getByProduct : (id, callback) => {
        let sql = `SELECT product_review.*, user.name, user.image
                  FROM product_review INNER JOIN user ON user.id = 
                  product_review.user_id WHERE product_review.product_id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows)
        })
    },

    addReview : (object, callback) => {
        let sql = `INSERT INTO product_review SET ?`;
        database.query(sql, [object])
        .then(rows => {
            callback("success")
        })
        .catch(error => {
            callback("failed")
        })
    }
}