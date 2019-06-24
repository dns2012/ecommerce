const express   = require("express");

const router    = express.Router();

const moment    = require("moment");

const tokenHelper = require("../../helpers/token");

const cartModel = require("../../models/cart");

router.post("/", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.body.userId;
            let productId = req.body.productId;
            let quantity = req.body.quantity;
            let attribute = JSON.stringify(req.body.attribute);
            let createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
            let updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
            cartModel.getByUserAndProduct(userId, productId, (results) => {
                if(results.length == 0) {
                    let cartObject = {
                        id : 0,
                        user_id : userId,
                        product_id : productId,
                        quantity : quantity,
                        attribute : attribute,
                        created_at : createdAt,
                        updated_at : updatedAt
                    }
                    cartModel.addCart(cartObject, (results) => {
                        if(results != "error") {
                            res.status(201).json({
                                status : true,
                                message : "success"
                            })
                        } else {
                            res.status(400).json({
                                status : false,
                                message : "some error occured"
                            })
                        }
                    })
                } else {
                    let cartId = results[0].id;
                    let newQuantity = parseInt(results[0].quantity) + quantity;
                    let newAttribute = attribute;
                    let cartObject = {
                        quantity : newQuantity,
                        attribute : newAttribute
                    }
                    cartModel.updateCart(cartId, cartObject, (results) => {})
                    res.status(200).json({
                        status : true,
                        message : "success"
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

router.get("/user", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.query.id;
            cartModel.getByUser(userId, (results) => {
                let resultsOne = results;
                var seller = [];
                var cart = [];
                for(var i in resultsOne) {
                    var indexSeller = seller.indexOf(resultsOne[i].seller_id);
                    if(indexSeller < 0) {
                        var cartObject = {
                            sellerId : resultsOne[i].seller_id,
                            sellerName : resultsOne[i].seller_name,
                            sellerImage : resultsOne[i].seller_image,
                            product : [], 
                            subtotal : 0
                        }
                        seller.push(resultsOne[i].seller_id);
                        cart.push(cartObject);
                    }
                }
                var total = 0;
                for(var i in cart) {
                    var cartSubtotal = 0;
                    for(var u in resultsOne) {
                        if(cart[i].sellerId == resultsOne[u].seller_id) {
                            var subtotal = parseInt(resultsOne[u].price) * parseInt(resultsOne[u].quantity);
                            cartSubtotal += subtotal;
                            var productObject = {
                                cartId : resultsOne[u].cart_id,
                                productId : resultsOne[u].product_id,
                                image : resultsOne[u].product_image,
                                name : resultsOne[u].product_name,
                                price : resultsOne[u].price,
                                quantity : resultsOne[u].quantity,
                                subtotal : subtotal,
                                attribute : JSON.parse(resultsOne[u].attribute)
                            }
                            cart[i].product.push(productObject);
                            cart[i].subtotal = cartSubtotal;
                        }
                    }
                    total += cartSubtotal;
                }
                let finalCart = {
                    cart : cart,
                    total : total
                }
                res.status(200).json({
                    message : "oke",
                    data : finalCart
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

router.put("/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let cartId = req.params.id;
            let quantity = req.body.quantity;
            let attribute = JSON.stringify(req.body.attribute);
            var cartObject;
            if(attribute) {
                cartObject = {
                    quantity : quantity,
                    attribute : attribute
                }
            } else {
                cartObject = {
                    quantity : quantity
                }
            }
            cartModel.updateCart(cartId, cartObject, (results) => {
                if(results == "success") {
                    res.status(200).json({
                        status : true,
                        message : "success"
                    })
                } else {
                    res.status(400).json({
                        status : true,
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

router.delete("/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let cartId = req.params.id;
            cartModel.deleteCart(cartId, (results) => {
                if(results == "success") {
                    res.status(200).json({
                        status : true,
                        message : "success"
                    })
                } else {
                    res.status(400).json({
                        status : true,
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

module.exports = router;