const express   = require("express");

const router    = express.Router();

const tokenHelper = require("../../helpers/token");

const transactionOrderModel = require("../../models/transactionOrder");

router.get("/user", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.query.id;
            let status = req.query.status;
            transactionOrderModel.getOrderBySeller(userId, status, (results) => {
                let transactionOrder = results.transactionOrder;
                let transactionOrderProduct = results.transactionOrderProduct;
                var response = [];
                if(transactionOrder.length > 0) {
                    for(var i in transactionOrder) {
                        var orderObject = {
                            transactionOrder : transactionOrder[i],
                            transactionOrderProduct : []
                        }
                        for(var u in transactionOrderProduct) {
                            if(transactionOrder[i].id == transactionOrderProduct[u].transaction_order_id) {
                                orderObject.transactionOrderProduct.push(transactionOrderProduct[u])
                            }
                        }
                        response.push(orderObject);
                    }
                    res.status(200).json({
                        status : "true",
                        data : response
                    })
                } else {
                    res.status(200).json({
                        status : "true",
                        data : response
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


router.get("/detail/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let orderId = req.params.id;
            transactionOrderModel.getOrderDetailBySeller(orderId, (results) => {
                let transactionOrder = results.transactionOrder;
                if(transactionOrder.length > 0) {
                    res.status(200).json({
                        status : "true",
                        data : results
                    })
                } else {
                    res.status(200).json({
                        status : "true",
                        data : response
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

router.put("/status", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let orderId = req.query.order;
            let body = req.body;
            transactionOrderModel.updateTransactionOrder(orderId, body, (results) => {
                if(results == "success") {
                    res.status(200).json({
                        status : true,
                        message : "updated succesfully"
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
module.exports = router;