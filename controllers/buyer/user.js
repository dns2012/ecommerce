const express   = require("express");

const router    = express.Router();

const userModel = require("../../models/user");

const tokenHelper = require("../../helpers/token");

router.get("/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            userModel.getById(req.params.id, (results) => {
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
            userModel.updateUser(req.body, req.params.id, (results) => {
                userModel.getById(req.params.id, (results) => {
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