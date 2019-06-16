const express   = require("express");

const router    = express.Router();

const moment    = require("moment");

const tokenHelper = require("../../helpers/token");

const cartModel = require("../../models/cart");

const cartAttributeModel = require("../../models/cartAttribute");

router.post("/", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.body.userId;
            let productId = req.body.productId;
            let quantity = req.body.quantity;
            let attribute = req.body.attribute;
            let createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
            let updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
            cartModel.getByUserAndProduct(userId, productId, (results) => {
                if(results.length == 0) {
                    let cartObject = {
                        id : 0,
                        user_id : userId,
                        product_id : productId,
                        quantity : quantity,
                        created_at : createdAt,
                        updated_at : updatedAt
                    }
                    cartModel.addCart(cartObject, (results) => {
                        if(results != "error") {
                            let cartId = results;
                            if(attribute.length > 0) {
                                for(var i in attribute) {
                                    var cartAttributeObject = {
                                        id : 0,
                                        cart_id : cartId,
                                        field : attribute[i].field,
                                        value : attribute[i].value
                                    }
                                    cartAttributeModel.addCartAttribute(cartAttributeObject, (results) => {});
                                }
                            }
                            res.status(201).json({
                                status : true,
                                message : "oke"
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
                    let cartObject = {
                        quantity : newQuantity
                    }
                    cartModel.updateCart(cartId, cartObject, (results) => {
                        console.log(results)
                    })
                    res.status(201).json({
                        status : true,
                        message : "oke"
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
                for(var i in resultsOne) {
                    var indexSeller = seller.indexOf(resultsOne[i].seller_id);
                    if(indexSeller < 0) {
                        var sellerObject = {
                            sellerId : resultsOne[i].seller_id,
                            sellerName : resultsOne[i].seller_name,
                            sellerImage : resultsOne[i].seller_image,
                            product : []
                        }
                        seller.push(sellerObject);
                    }
                }
                for(var i in seller) {
                    var sellerSubtotal = 0;
                    for(var u in resultsOne) {
                        if(seller[i].sellerId == resultsOne[u].seller_id) {
                            var subtotal = parseInt(resultsOne[u].price) * parseInt(resultsOne[u].quantity);
                            sellerSubtotal += subtotal;
                            var productObject = {
                                cartId : resultsOne[u].cart_id,
                                name : resultsOne[u].product_name,
                                price : resultsOne[u].price,
                                quantity : resultsOne[u].quantity,
                                subtotal : subtotal
                            }
                            seller[i].product.push(productObject);
                        }
                    }
                    console.log(sellerSubtotal)
                }
                res.status(200).json({
                    message : "oke",
                    data : seller
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