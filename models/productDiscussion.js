const database  = require("../database");

module.exports =  {
    getByProduct : (id, callback) => {
        let sql = `SELECT product_discussion.*, user.name, user.image
                  FROM product_discussion INNER JOIN user ON user.id = 
                  product_discussion.user_id WHERE product_discussion.product_id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows)
        })
    },

    addDiscussion : (object, callback) => {
        let sql = `INSERT INTO product_discussion SET ?`;
        database.query(sql, [object])
        .then(rows => {
            callback("success")
        })
        .catch(error => {
            callback("failed")
        })
    }
}