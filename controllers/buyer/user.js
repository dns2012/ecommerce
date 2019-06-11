const express   = require("express");

const router    = express.Router();

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


module.exports = router;