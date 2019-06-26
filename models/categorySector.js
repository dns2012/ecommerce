const database  = require("../database");

module.exports = {
    getAll : (callback) => {
        let sql = `SELECT * FROM category_sector`;
        database.query(sql)
        .then(rows => {
            callback(rows)
        })
    },

    getAllSeller : (callback) => {
        var categorySector, categorySectorId, category;
        let sql = `SELECT * FROM category_sector`;
        database.query(sql)
        .then(rows => {
            categorySector = rows;
            categorySectorId = [];
            for(var i in rows) {
                categorySectorId.push(rows[i].id);
            }
            let sql = `SELECT * FROM category WHERE category_sector_id IN (?)`;
            return database.query(sql, [categorySectorId]);
        })
        .then(rows => {
            category = rows;
            var object = [];
            for(var i in categorySector) {
                object[i] = {
                    sector : categorySector[i],
                    category : []
                }
                for(var u in category) {
                    if(categorySector[i].id == category[u].category_sector_id) {
                        object[i].category.push(category[u]);
                    }
                }
                // console.log(object)
            }
            callback(object)
        })
    }
}