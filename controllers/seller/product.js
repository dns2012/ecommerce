const express   = require("express");

const router    = express.Router();

const moment    = require("moment");

const productModel = require("../../models/product");

const productImageModel = require("../../models/productImage");

const productSpecificationModel = require("../../models/productSpecification");

const productAttributeModel = require("../../models/productAttribute");

const productWishlistModel = require("../../models/productWishlist");

const productReviewModel = require("../../models/productReview");

const productDiscussionModel = require("../../models/productDiscussion");

const tokenHelper = require("../../helpers/token");

const multer    = require('multer');

const uploadDir = process.env.PWD + '/public/product';

const storage   = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, moment().unix() + file.originalname)
    }
});

const upload    = multer({ storage: storage });

router.post("/image", upload.single('image'), (req, res, next) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            res.status(201).json({
                status : true,
                message : "uploaded",
                image : req.file.filename
            })
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

router.post("/", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let sellerId = req.body.sellerId;
            let categoryId = req.body.categoryId;
            let name = req.body.name;
            let description = req.body.description;
            let quantity = req.body.quantity;
            let weight = req.body.weight;
            let price = req.body.price;
            let createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
            let updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
            let image = req.body.image;
            let specification = req.body.specification;
            let attribute = req.body.attribute;
            let productObject = {
                id : 0,
                category_id : categoryId,
                seller_id : sellerId,
                name : name,
                description : description,
                quantity : quantity,
                weight : weight,
                price : price,
                view : 0,
                created_at : createdAt,
                updated_at : updatedAt
            }
            productModel.addProduct(productObject, (results => {
                if(results != 'error') {
                    let productImageObject = {
                        id : 0,
                        product_id : results,
                        name : image
                    }
                    productImageModel.addProductImage(productImageObject);
                    for(var i in specification) {
                        var productSpecificationObject = {
                            id : 0,
                            product_id : results,
                            field : specification[i].field,
                            value : specification[i].value
                        }
                        productSpecificationModel.addProductSpecification(productSpecificationObject);
                    }
                    for(var i in attribute) {
                        var productAttributeObject = {
                            id : 0,
                            product_id : results,
                            field : attribute[i].field,
                            value : attribute[i].value
                        }
                        productAttributeModel.addProductAttribute(productAttributeObject);
                    }
                    res.status(201).json({
                        status : true,
                        message : "product added successfully"
                    })
                } else {
                    res.status(400).json({
                        status : false,
                        message : "some error occured"
                    })
                }
            }))
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

module.exports = router;