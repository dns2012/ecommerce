const express   = require("express");

const router    = express.Router();

const http      = require("https");

const qs        = require("querystring");

const tokenHelper = require("../../helpers/token");

require("dotenv").config();

router.get("/province", (req, res) => {
    let options = {
        "method": "GET",
        "hostname": "api.rajaongkir.com",
        "port": null,
        "path": "/starter/province",
        "headers": {
            "key": process.env.RAJA_ONGKIR_KEY
        }
    };

    let request = http.request(options, function (response) {
        var chunks = [];
        response.on("data", function (chunk) {
            chunks.push(chunk);
        });
        response.on("end", function () {
            let body = Buffer.concat(chunks);
            let json = JSON.parse(body);
            let results = json.rajaongkir.results;
            res.status(200).json({
                status : true,
                data : results
            })
        });
    });    
    request.end();
})

router.get("/city", (req, res) => {
    let options = {
        "method": "GET",
        "hostname": "api.rajaongkir.com",
        "port": null,
        "path": "/starter/city?province=" + req.query.province,
        "headers": {
            "key": process.env.RAJA_ONGKIR_KEY
        }
    };

    let request = http.request(options, function (response) {
        var chunks = [];
        response.on("data", function (chunk) {
            chunks.push(chunk);
        });
        response.on("end", function () {
            let body = Buffer.concat(chunks);
            let json = JSON.parse(body);
            let results = json.rajaongkir.results;
            res.status(200).json({
                status : true,
                data : results
            })
        });
    });    
    request.end();
})

router.post("/cost", (req, res) => {
    let options = {
        "method": "POST",
        "hostname": "api.rajaongkir.com",
        "port": null,
        "path": "/starter/cost",
        "headers": {
            "key": process.env.RAJA_ONGKIR_KEY,
            "content-type": "application/x-www-form-urlencoded",
            "content-length": "50"
        }
    };

    let request = http.request(options, function (response) {
        var chunks = [];
        response.on("data", function (chunk) {
            chunks.push(chunk);
        });
        response.on("end", function () {
            let body = Buffer.concat(chunks);
            let json = JSON.parse(body);
            let results = json.rajaongkir.results;
            res.status(200).json({
                status : true,
                data : results
            })
        });
    });
    request.write(qs.stringify({
        origin : req.body.origin,
        destination: req.body.destination,
        weight: req.body.weight,
        courier: req.body.courier
    }))
    request.end();
})

module.exports = router;