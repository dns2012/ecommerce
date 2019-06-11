const express   = require("express");

const router    = express.Router();

const moment    = require("moment");

const tokenHelper = require("../../helpers/token");

const userAddressModel = require("../../models/userAddress")

router.post("/", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            userAddressModel.countByUser(req.body.userId, (results) => {
                var status;
                if(results > 0) {
                    status = 0
                } else {
                    status = 1
                }
                let userId = req.body.userId;
                let inProvince = req.body.province;
                let province = inProvince.split("-");
                let provinceId = parseInt(province[0]);
                let provinceName = province[1];
                let inCity = req.body.city;
                let city = inCity.split("-");
                let cityId = parseInt(city[0]);
                let cityName = city[1];
                let postal = req.body.postal;
                let address = req.body.address;
                let createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
                let updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
                let userAddressObject = {
                    id : 0,
                    user_id : userId,
                    province_id : provinceId,
                    province_name : provinceName,
                    city_id : cityId,
                    city_name : cityName,
                    postal : postal,
                    address : address,
                    status : status,
                    created_at : createdAt,
                    updated_at : updatedAt
                }
                userAddressModel.addAddress(userAddressObject, (results) => {
                    if(results == "success") {
                        userAddressModel.getByUser(userId, (results) => {
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
            userAddressModel.getByUser(userId, (results) => {
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
            userAddressModel.getById(addressId, (results) => {
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
        if(callback == "valid") {
            let inProvince = req.body.province;
            let province = inProvince.split("-");
            let provinceId = parseInt(province[0]);
            let provinceName = province[1];
            let inCity = req.body.city;
            let city = inCity.split("-");
            let cityId = parseInt(city[0]);
            let cityName = city[1];
            let postal = req.body.postal;
            let address = req.body.address;
            let updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
            let userAddressObject = {
                province_id : provinceId,
                province_name : provinceName,
                city_id : cityId,
                city_name : cityName,
                postal : postal,
                address : address,
                updated_at : updatedAt
            }
            userAddressModel.updateAddress(req.params.id, userAddressObject, (results) => {
                if(results == "success") {
                    userAddressModel.getById(req.params.id, (results) => {
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
            userAddressModel.deleteById(addressId, (results) => {
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
            userAddressModel.getByUserDefault(userId, (results) => {
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
            userAddressModel.setNeutral(userId, (results) => {
                if(results == "success") {
                    userAddressModel.setByUserDefault(addressId, (results) => {
                        if(results == "success") {
                            userAddressModel.getByUser(userId, (results) => {
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