const express   = require("express");

const router    = express.Router();

const productModel = require("../models/product");

const tokenHelper = require("../helpers/token");

router.get("/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            productModel.getById(req.params.id, (results) => {
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
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

module.exports = router;