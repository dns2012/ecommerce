const database  = require("../database");

module.exports = {
    getById : (id, callback) => {
        let product, productSpecification, productAttribute, productImage;
        let query = `SELECT *, 
                    (SELECT COUNT(*) FROM product_review WHERE 
                    product_review.product_id = product.id) as review,
                    (SELECT COUNT(*) FROM product_wishlist WHERE
                    product_wishlist.product_id = product.id) as wishlist,
                    (SELECT COUNT(*) FROM product_discussion WHERE
                    product_discussion.product_id = product.id) as discussion,
                    (SELECT ROUND(AVG(rating),1) FROM product_rating WHERE
                    product_rating.product_id = product.id) as rating
                    FROM product WHERE id=?`;
        database.query(query, [id])
        .then(rows => {
            product = rows;
            return database.query(`SELECT * FROM product_specification 
            WHERE product_id=?`, [id])
        })
        .then(rows => {
            productSpecification = rows
            return database.query(`SELECT * FROM product_attribute 
            WHERE product_id=?`, [id]);
        })
        .then(rows => {
            productAttribute = rows;
            return database.query(`SELECT * FROM product_image 
            WHERE product_id=?`, [id]);
        })
        .then(rows => {
            productImage = rows;
            return productImage;
        })
        .then(() => {
            let obj = {
                product : product[0],
                productSpecification : productSpecification,
                productAttribute : productAttribute,
                productImage : productImage
            }
            callback(obj)
        })
    },

    getAll : (sort, limit, offset, callback) => {
        let query;
        if(sort == "popular") {
            query = `SELECT *, (SELECT ROUND(AVG(rating),1) FROM product_rating WHERE
                    product_rating.product_id = product.id) as rating FROM product
                    ORDER BY view DESC LIMIT ? OFFSET ?`
        } else if(sort == "latest") {
            query = `SELECT *, (SELECT ROUND(AVG(rating),1) FROM product_rating WHERE
                    product_rating.product_id = product.id) as rating FROM product
                    ORDER BY created_at DESC LIMIT ? OFFSET ?`
        } else if(sort == "cheapest") {
            query = `SELECT *, (SELECT ROUND(AVG(rating),1) FROM product_rating WHERE
                    product_rating.product_id = product.id) as rating FROM product
                    ORDER BY price ASC LIMIT ? OFFSET ?`
        } else if(sort == "expensive") {
            query = `SELECT *, (SELECT ROUND(AVG(rating),1) FROM product_rating WHERE
                    product_rating.product_id = product.id) as rating FROM product
                    ORDER BY price DESC LIMIT ? OFFSET ?`
        } else {
            query = `SELECT *, (SELECT ROUND(AVG(rating),1) FROM product_rating WHERE
                    product_rating.product_id = product.id) as rating FROM product
                    ORDER BY view DESC LIMIT ? OFFSET ?`
        }
        database.query(query, [limit, offset])
        .then(rows => {
            callback(rows)
        })
    }
}