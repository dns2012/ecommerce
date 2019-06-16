const database  = require("../database");

module.exports = {
    addCartAttribute : (object, callback) => {
        let sql = `INSERT INTO cart_attribute SET ?`;
        database.query(sql, object)
        .then(rows => {
            callback("success");
        })
        .catch(error => {
            callback("error");
        })
    }
}