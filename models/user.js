const database  = require("../database");

module.exports = {
    getByEmail : (email, callback) => {
        let query = `SELECT * FROM user WHERE email=?`;
        let value = [email];
        database.query(query, value)
        .then(rows => {
            callback(rows)
        })
    },

    addUser : (object, callback) => {
        let query = `INSERT INTO user SET ?`;
        database.query(query, object)
        .then(rows  =>  {
            callback(rows.insertId)
        })
    },

    getById : (id, callback) => {
        let query = `SELECT * FROM user WHERE id=?`;
        database.query(query, id)
        .then(rows => {
            callback(rows)
        })
    },

    updateUser : (object, id, callback) => {
        let query = `UPDATE user SET ? WHERE id=?`;
        database.query(query, [object, id],)
        .then(rows => {
            callback(id)
        })
    },
}