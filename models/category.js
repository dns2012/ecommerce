const database  = require("../database");

module.exports = {
    getBySector : (id, callback) => {
        let sql = `SELECT * FROM category WHERE category_sector_id=? AND parent_id='0'`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows)
        })
    },

    getByParent : (id, callback) => {
        let sql = `SELECT * FROM category WHERE parent_id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows)
        })
    }
}