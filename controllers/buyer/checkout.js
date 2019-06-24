const express   = require("express");

const router    = express.Router();

const moment    = require("moment");

const tokenHelper = require("../../helpers/token");

const paymentHelper = require("../../helpers/payment");

const cartModel = require("../../models/cart");

const transactionModel = require("../../models/transaction");

const transactionOrderModel = require("../../models/transactionOrder");

router.post("/", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.body.userId;
            let payment = req.body.payment;
            let checkout = req.body.checkout;
            let createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
            var confirmedSeller = [];
            var shipment = 0;
            for (var i in checkout) {
                confirmedSeller.push(checkout[i].sellerId);
                shipment += checkout[i].expedition.cost;
            }
            cartModel.getByUser(userId, (results) => {
                let resultsOne = results;
                var seller = [];
                var cart = [];
                for(var i in resultsOne) {
                    var indexSeller = seller.indexOf(resultsOne[i].seller_id);
                    if(indexSeller < 0) {
                        var cartObject = {
                            sellerId : resultsOne[i].seller_id, 
                            subtotal : 0,
                            product  : []
                        }
                        seller.push(resultsOne[i].seller_id);
                        var indexConfirmedSeller = confirmedSeller.indexOf(resultsOne[i].seller_id);
                        if(indexConfirmedSeller >= 0) {
                            cart.push(cartObject);
                        }
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
                let timestamp = moment().unix();
                let transactionId = userId + timestamp
                let transactionObject = {
                    id : transactionId,
                    user_id :   userId,
                    total : total + shipment,
                    payment : payment,
                    created_at : createdAt
                }
                transactionModel.addTransaction(transactionObject, (results) => {
                    if(results != "error") {
                        let transactionId = results;
                        for(var i in cart) {
                            for(var u in checkout) {
                                if(cart[i].sellerId == checkout[u].sellerId) {
                                    var sellerId = cart[i].sellerId;
                                    var sellerOrderCode = sellerId + timestamp;
                                    var transactionCode = "TS" + sellerOrderCode.toString();
                                    var subtotal = cart[i].subtotal;
                                    var shipment = checkout[u].expedition.cost;
                                    var totalSecond = subtotal + shipment;
                                    var expedition = checkout[u].expedition;
                                    var transactionOrderObject = {
                                        id              :   0,
                                        transaction_id  :   transactionId,
                                        seller_id       :   sellerId,
                                        transaction_code:   transactionCode,
                                        subtotal        :   subtotal,
                                        shipment        :   shipment,
                                        total           :   totalSecond,
                                        expedition      :   JSON.stringify(expedition),
                                        created_at      :   createdAt
                                    }
                                    var product = cart[i].product;
                                    transactionOrderModel.addTransactionOrder(transactionOrderObject, product, (results) => {
                                        if(results != "error") {
                                            res.status(201).json({
                                                status : true,
                                                message : "order created successfully",
                                                transaction : transactionId
                                            })
                                        }
                                    })
                                }
                            }
                        }
                    }
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

router.post("/order", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let transactionId = req.body.transactionId;
            let paymentMethod = req.body.paymentMethod;
            let paymentAttribute = req.body.paymentAttribute;
            transactionModel.getByTransaction(transactionId, (transactionResults) => {
                if(paymentMethod == "credit_card") {
                    paymentHelper.getToken(paymentAttribute, (results) => {
                        let response = JSON.parse(results);
                        if(response.status_code == 200) {
                            let token = response.token_id;
                            let paymentObject = {
                                payment_type : "credit_card",
                                credit_card : {
                                    token_id : token,
                                    authentication : true
                                }
                            }
                            let bodyObject = Object.assign(paymentObject, transactionResults);
                            let bodyRequest = JSON.stringify(bodyObject);
                            paymentHelper.creditCard(bodyRequest, (results) => {
                                let response = JSON.parse(results);
                                if(response.status_code == 201) {
                                    res.status(201).json({
                                        status : true,
                                        midtrans : response
                                    })
                                } else {
                                    res.status(400).json({
                                        status : false,
                                        midtrans : response
                                    })
                                }
                            })
                        } else {
                            res.status(400).json({
                                status : false,
                                message : response.status_message,
                                description : response.validation_messages
                            })
                        }
                    })
                } else if(paymentMethod == "bank_transfer") {
                    if(paymentAttribute.bank == "bca") {
                        let paymentObject = {
                            payment_type : "bank_transfer",
                            bank_transfer : {
                                bank : "bca",
                            }
                        }
                        let bodyObject = Object.assign(paymentObject, transactionResults);
                        let bodyRequest = JSON.stringify(bodyObject);
                        paymentHelper.bankTransferBCA(bodyRequest, (results) => {
                            let response = JSON.parse(results);
                            if(response.status_code == 201) {
                                res.status(201).json({
                                    status : true,
                                    midtrans : response
                                })
                            } else {
                                res.status(400).json({
                                    status : false,
                                    midtrans : response
                                })
                            }
                        })
                    }
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