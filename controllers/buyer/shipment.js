const express   = require("express");

const router    = express.Router();

const http      = require("https");

const qs        = require("querystring");

const tokenHelper = require("../../helpers/token");

require("dotenv").config();

router.get("/province", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
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
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

router.get("/province/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let provinceId = req.params.id;
            let options = {
                "method": "GET",
                "hostname": "api.rajaongkir.com",
                "port": null,
                "path": "/starter/province?id=" + provinceId,
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
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

router.get("/city", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let provinceId = req.query.province;
            let options = {
                "method": "GET",
                "hostname": "api.rajaongkir.com",
                "port": null,
                "path": "/starter/city?province=" + provinceId,
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
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

router.get("/city/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let cityId = req.params.id;
            let options = {
                "method": "GET",
                "hostname": "api.rajaongkir.com",
                "port": null,
                "path": "/starter/city?id=" + cityId,
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
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

router.post("/cost", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let origin = req.body.origin;
            let destination = req.body.destination;
            let weight = req.body.weight;
            let courier = req.body.courier;
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
                origin : origin,
                destination: destination,
                weight: weight,
                courier: courier
            }))
            request.end();
        } else {
            res.status(400).json({
                status : false,
                message : "invalid token"
            })
        }
    })
})

module.exports = router;