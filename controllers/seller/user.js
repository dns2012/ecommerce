const express   = require("express");

const router    = express.Router();

const moment    = require("moment");

const tokenHelper = require("../../helpers/token");

const sellerModel = require("../../models/seller");

const multer    = require('multer');

const uploadDir = process.env.PWD + '/public/seller';

const storage   = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, moment().unix() + file.originalname)
    }
});

const upload    = multer({ storage: storage });

router.get("/:id", (req, res) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            let userId = req.params.id;
            sellerModel.getById(userId, (results) => {
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
            sellerModel.updateSeller(body, userId, (results) => {
                sellerModel.getById(userId, (results) => {
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

router.post("/image", upload.single('image'), (req, res, next) => {
    tokenHelper.verifyToken(req.headers.token, (callback) => {
        if(callback == "valid") {
            res.status(201).json({
                status : true,
                message : "uploaded",
                image : req.file.filename
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
            sellerModel.getById(userId, (results) => {
                if(results[0]) {
                    if(bcrypt.compareSync(oldPassword, results[0].password)) {
                        let userObject = {
                            password : password
                        }
                        sellerModel.updateUser(userObject, userId, (results) => {
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