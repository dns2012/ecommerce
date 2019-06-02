const express   = require("express");

const router    = express.Router();

const productModel = require("../models/product");

const tokenHelper = require("../helpers/token");

router.get("/", (req, res) => {
    let sort = req.query.sort;
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let preOffset = page * limit;
    let offset = preOffset - limit;
    console.log(offset);
    productModel.getAll(sort, limit, offset, (results) => {
        res.status(200).json({
            status : true,
            data : results
        })
    })
})

router.get("/:id", (req, res) => {
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
})

module.exports = router;