const express   = require("express");

const router    = express.Router();

const bcrypt    = require("bcrypt");

const userModel = require("../../models/user");

const tokenHelper = require("../../helpers/token");

router.get("/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.params.id;
            userModel.getById(userId, (results) => {
                if(results[0]) {
                    res.status(200).json({
                        status : true,
                        data : results
                    })
                } else {
                    res.status(200).json({
                        status : true,
                        data : null
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


router.put("/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let body = req.body;
            let userId = req.params.id;
            userModel.updateUser(body, userId, (results) => {
                userModel.getById(userId, (results) => {
                    if(results[0]) {
                        res.status(200).json({
                            status : true,
                            data : results
                        })
                    } else {
                        res.status(400).json({
                            status : false,
                            message : "user not found"
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

router.put("/password/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.params.id;
            let oldPassword = req.body.oldPassword;
            let newPassword = req.body.newPassword;
            let password = bcrypt.hashSync(newPassword, 10);
            userModel.getById(userId, (results) => {
                if(results[0]) {
                    if(bcrypt.compareSync(oldPassword, results[0].password)) {
                        let userObject = {
                            password : password
                        }
                        userModel.updateUser(userObject, userId, (results) => {
                            if(results > 0) {
                                res.status(200).json({
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
                        res.status(400).json({
                            status : false,
                            message : "old password not match"
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