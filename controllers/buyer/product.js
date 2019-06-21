const express   = require("express");

const router    = express.Router();

const moment    = require("moment");

const productModel = require("../../models/product");

const productWishlistModel = require("../../models/productWishlist");

const productReviewModel = require("../../models/productReview");

const productDiscussionModel = require("../../models/productDiscussion");

const tokenHelper = require("../../helpers/token");

// PRODUCT
router.get("/", (req, res) => {
    let sort = req.query.sort;
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let preOffset = page * limit;
    let offset = preOffset - limit;
    productModel.getAll(sort, limit, offset, (results) => {
        res.status(200).json({
            status : true,
            data : results
        })
    })
})

router.get("/category/:id", (req, res) => {
    let categoryId = req.params.id;
    let sort = req.query.sort;
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let preOffset = page * limit;
    let offset = preOffset - limit;
    productModel.getAllByCategory(categoryId, sort, limit, offset, (results) => {
        res.status(200).json({
            status : true,
            data : results
        })
    })
})

router.get("/:id", (req, res) => {
    let productId = req.params.id;
    productModel.getById(productId, (results) => {
        if(results.product) {
            res.status(200).json({
                status : true,
                data : results
            })
        } else {
            res.status(404).json({
                status : false,
                message : "product not found"
            })
        }
    });
})

// PRODUCT WISHLIST
router.post("/wishlist", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.body.userId;
            let productId = req.body.productId;
            let wishlistObject = {
                id : 0,
                product_id : productId,
                user_id : userId
            }
            productWishlistModel.checkWishlist(productId, userId, (results) => {
                if(results == 0) {
                    productWishlistModel.addWishlist(wishlistObject, (results) => {
                        if(results == "success") {
                            productWishlistModel.getByUserId(userId, (results) => {
                                res.status(201).json({
                                    status : true,
                                    data : results
                                })
                            })
                        } else {
                            res.status(400).json({
                                status : false,
                                message : "some error occured"
                            })
                        }
                    })
                } else {
                    productWishlistModel.getByUserId(userId, (results) => {
                        res.status(201).json({
                            status : true,
                            data : results
                        })
                    })
                }
            })
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

router.get("/wishlist/user", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.query.id;
            productWishlistModel.getByUserId(userId, (results) => {
                res.status(200).json({
                    status : true,
                    data : results
                })
            })
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

router.delete("/wishlist/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let wishlistId = req.params.id;
            productWishlistModel.deleteWishlist(wishlistId, (results) => {
                if(results == "success") {
                    res.status(200).json({
                        status : true,
                        message : "wishlist deleted successfully"
                    })
                }
            })
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

// PRODUCT REVIEW
router.post("/review", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let productId = req.body.productId;
            let userId = req.body.userId;
            let review = req.body.review;
            let createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
            let obj = {
                id : 0,
                product_id : productId,
                user_id : userId,
                review : review,
                created_at : createdAt
            }
            productReviewModel.addReview(obj, (results) => {
                if(results == "success") {
                    productReviewModel.getByProduct(productId, (results) => {
                        res.status(201).json({
                            status : true,
                            data : results
                        })
                    })
                } else {
                    res.status(400).json({
                        status : false,
                        message : "some error occured"
                    })
                }
            })
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

router.get("/review/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let productId = req.params.id;
            productReviewModel.getByProduct(productId, (results) => {
                res.status(201).json({
                    status : true,
                    data : results
                })
            })
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

// PRODUCT DISCUSSION
router.post("/discussion", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let productId = req.body.productId;
            let userId = req.body.userId;
            let discussion = req.body.discussion;
            let createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
            let obj = {
                id : 0,
                product_id : productId,
                user_id : userId,
                discussion : discussion,
                created_at : createdAt
            }
            productDiscussionModel.addDiscussion(obj, (results) => {
                if(results == "success") {
                    productDiscussionModel.getByProduct(productId, (results) => {
                        res.status(201).json({
                            status : true,
                            data : results
                        })
                    })
                } else {
                    res.status(400).json({
                        status : false,
                        message : "some error occured"
                    })
                }
            })
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

router.get("/discussion/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let productId = req.params.id;
            productDiscussionModel.getByProduct(productId, (results) => {
                res.status(201).json({
                    status : true,
                    data : results
                })
            })
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

module.exports = router;