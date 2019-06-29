const express   = require("express");

const router    = express.Router();

const moment    = require("moment");

const tokenHelper = require("../../helpers/token");

const sellerBankModel = require("../../models/sellerBank")

router.post("/", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            sellerBankModel.countBySeller(req.body.userId, (results) => {
                var status;
                if(results > 0) {
                    status = 0
                } else {
                    status = 1
                }
                let userId = req.body.userId;
                let name = req.body.name;
                let bankAccount = req.body.bankAccount;
                let bank = req.body.bank;
                let bankBranch = req.body.bankBranch;
                let city = req.body.city;
                let verified = 0;
                let createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
                let updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
                let sellerBankObject = {
                    id : 0,
                    seller_id : userId,
                    name : name,
                    bank_account : bankAccount,
                    bank : bank,
                    bank_branch : bankBranch,
                    city : city,
                    status : status,
                    verified : verified,
                    created_at : createdAt,
                    updated_at : updatedAt
                }
                sellerBankModel.addBank(sellerBankObject, (results) => {
                    if(results == "success") {
                        sellerBankModel.getBySeller(userId, (results) => {
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
            })
            
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

router.get("/", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.query.user;
            sellerBankModel.getBySeller(userId, (results) => {
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


router.get("/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let addressId = req.params.id;
            sellerBankModel.getById(addressId, (results) => {
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

router.put("/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        console.log(callback);
        if(callback == "valid") {
            let bankId = req.params.id;
            let name = req.body.name;
            let bankAccount = req.body.bankAccount;
            let bank = req.body.bank;
            let bankBranch = req.body.bankBranch;
            let city = req.body.city;
            let verified = 0;
            let updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
            let sellerBankObject = {
                name : name,
                bank_account : bankAccount,
                bank : bank,
                bank_branch : bankBranch,
                city : city,
                verified : verified,
                updated_at : updatedAt
            }
            sellerBankModel.updateBank(bankId, sellerBankObject, (results) => {
                if(results == "success") {
                    sellerBankModel.getById(bankId, (results) => {
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

router.delete("/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let addressId = req.params.id;
            sellerBankModel.deleteById(addressId, (results) => {
                if(results == "success") {
                    res.status(201).json({
                        status : true,
                        message : "address deleted successfully"
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

router.get("/default/user", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.query.id;
            sellerBankModel.getBySellerDefault(userId, (results) => {
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


router.put("/default/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.body.userId;
            let addressId = req.params.id;
            sellerBankModel.setNeutral(userId, (results) => {
                if(results == "success") {
                    sellerBankModel.setBySellerDefault(addressId, (results) => {
                        if(results == "success") {
                            sellerBankModel.getBySeller(userId, (results) => {
                                res.status(201).json({
                                    status : true,
                                    data : results
                                })
                            })
                        }
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