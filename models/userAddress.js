const database  = require("../database");

module.exports = {
    countByUser : (id, callback) => {
        let sql = `SELECT COUNT(*) as total FROM user_address WHERE user_id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows[0].total)
        })
    },

    addAddress : (object, callback) => {
        let sql = `INSERT INTO user_address SET ?`;
        database.query(sql, object)
        .then(rows => {
            callback("success")
        })
    },

    getByUser : (id, callback) => {
        let sql = `SELECT id, user_id, province_name, city_name, postal, address, 
                  status FROM user_address WHERE user_id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows)
        })
    },

    getById : (id, callback) => {
        let sql = `SELECT id, user_id, province_name, city_name, postal, address, 
                  status FROM user_address WHERE id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows)
        })
    },

    updateAddress : (id, object, callback) => {
        let sql = `UPDATE user_address SET ? WHERE id=?`;
        database.query(sql, [object, id])
        .then(rows => {
            callback("success")
        })
    },

    deleteById : (id, callback) => {
        let sql = `DELETE FROM user_address WHERE id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback("success")
        })
    },

    getByUserDefault : (id, callback) => {
        let sql = `SELECT id, user_id, province_name, city_name, postal, address, 
                  status FROM user_address WHERE user_id=? AND status='1'`;
        database.query(sql, [id])
        .then(rows => {
            callback(rows)
        })
    },

    setNeutral : (id, callback) => {
        let sql = `UPDATE user_address SET status='0' WHERE user_id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback("success")
        })
    },

    setByUserDefault : (id, callback) => {
        let sql = `UPDATE user_address SET status='1' WHERE id=?`;
        database.query(sql, [id])
        .then(rows => {
            callback("success")
        })
    }
}