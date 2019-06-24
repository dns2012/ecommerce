const database  = require("../database");

module.exports = {
    getByEmail : (email, callback) => {
        let query = `SELECT * FROM seller WHERE email=?`;
        let value = [email];
        database.query(query, value)
        .then(rows => {
            callback(rows)
        })
    },

    addSeller : (object, callback) => {
        let query = `INSERT INTO seller SET ?`;
        database.query(query, object)
        .then(rows  =>  {
            callback(rows.insertId)
        })
    },

    getById : (id, callback) => {
        let query = `SELECT * FROM seller WHERE id=?`;
        database.query(query, id)
        .then(rows => {
            callback(rows)
        })
    },

    updateSeller : (object, id, callback) => {
        let query = `UPDATE seller SET ? WHERE id=?`;
        database.query(query, [object, id],)
        .then(rows => {
            callback(id)
        })
    },

    getByResidenceId : (residenceId, callback) => {
        let query = `SELECT * FROM seller WHERE residence_id=?`;
        let value = [residenceId];
        database.query(query, value)
        .then(rows => {
            callback(rows)
        })
    },
}