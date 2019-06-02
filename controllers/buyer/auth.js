const express   = require("express");

const router    = express.Router();

const bcrypt    = require("bcrypt");

const moment    = require("moment");

const userModel = require("../../models/user");

const tokenHelper = require("../../helpers/token");

router.get("/token", (req, res) => {
    const tokenPayload = {
        id : 2012,
        username : "dnsprogress"
    }
    const tokenSecret = "secretkey" 
    const tokenOptions = {
        expiresIn : "1m"
    }
    const token = jwt.sign(tokenPayload, tokenSecret, tokenOptions);
    res.status(200).json({
        message : "Token API",
        token : token
    })
})

router.post("/token", (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.token, "secretkey");
        res.status(200).json({
            message : "Token Verify API",
            tokenDec : decoded
        })
    } catch (error) {
        res.status(200).json({
            message : error,
        })
    }
})

// REGISTER USER
router.post("/register", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 10);
    let createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    let updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
    let userObject = {
        id : 0,
        name : name,
        email : email,
        password : password,
        image : "user-default.png",
        birthday : "1970-01-01",
        gender : "NONE",
        Phone : 62,
        created_at : createdAt,
        updated_at : updatedAt
    }

    userModel.getByEmail(email, (results) => {
        if(results.length > 0) {
            res.status(200).json({
                status  : false,
                message : "user already exist"
            })
        } else {
            userModel.addUser(userObject, (results) => {
                userModel.getById(results, (results) => {
                    res.status(201).json({
                        status : true,
                        message : "user registered successfully",
                        data : results
                    })
                })
            })
        }
    })
})

// LOGIN USER
router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    userModel.getByEmail(email, (results) => {
        if(results.length > 0) {
            if(bcrypt.compareSync(password, results[0].password)) {
                let payload = tokenHelper.getToken(
                    results[0].id, 
                    results[0].email
                );
                res.status(200).json({
                    status : true,
                    message : "user found",
                    data : results,
                    token : tokenHelper.getToken(payload)
                })
            } else {
                res.status(200).json({
                    status : false,
                    message : "wrong password",
                })
            }
        } else {
            res.status(200).json({
                status : false,
                message : "user not registered",
            })
        }
    })
})

module.exports = router;