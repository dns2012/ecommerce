const database  = require("../database");

module.exports = {
    countBySeller : (id, callback) => {
        let sql = `SELECT COUNT(*) as total FROM seller_bank WHERE seller_id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows[0].total)
        })
    },

    addBank : (object, callback) => {
        let sql = `INSERT INTO seller_bank SET ?`;
        database.query(sql, object)
        .then(rows => {
            callback("success")
        })
    },

    getBySeller : (id, callback) => {
        let sql = `SELECT * FROM seller_bank WHERE seller_id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows)
        })
    },

    getById : (id, callback) => {
        let sql = `SELECT * FROM seller_bank WHERE id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows)
        })
    },

    updateBank : (id, object, callback) => {
        let sql = `UPDATE seller_bank SET ? WHERE id=?`;
        database.query(sql, [object, id])
        .then(rows => {
            callback("success")
        })
    },

    deleteById : (id, callback) => {
        let sql = `DELETE FROM seller_bank WHERE id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback("success")
        })
    },

    getBySellerDefault : (id, callback) => {
        let sql = `SELECT * FROM seller_bank WHERE seller_id=? 
                  AND status='1'`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows)
        })
    },

    setNeutral : (id, callback) => {
        let sql = `UPDATE seller_bank SET status='0' WHERE seller_id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback("success")
        })
    },

    setBySellerDefault : (id, callback) => {
        let sql = `UPDATE seller_bank SET status='1' WHERE id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback("success")
        })
    }
}