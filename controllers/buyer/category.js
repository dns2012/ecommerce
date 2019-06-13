const express   = require("express");

const router    = express.Router();

const moment    = require("moment");

const categorySectorModel = require("../../models/categorySector");

const categoryModel = require("../../models/category");

router.get("/sector", (req, res) => {
    categorySectorModel.getAll((results) => {
        res.status(200).json({
            status : true,
            data : results
        })
    })
})

router.get("/sector/:id", (req, res) => {
    let sectorId = req.params.id;
    categoryModel.getBySector(sectorId, (results) => {
        res.status(200).json({
            status : true,
            data : results
        })
    })
})

router.get("/parent/:id", (req, res) => {
    let parentId = req.params.id;
    categoryModel.getByParent(parentId, (results) => {
        res.status(200).json({
            status : true,
            data : results
        })
    })
})

module.exports = router;