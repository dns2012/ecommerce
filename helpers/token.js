const jwt       = require("jsonwebtoken");

module.exports = {
    getToken : (tokenPayload) => {
        const tokenSecret = "secretkey" 
        const tokenOptions = {
            expiresIn : "1m"
        }
        const token = jwt.sign(tokenPayload, tokenSecret);
        return token;
    },

    verifyToken :(token, callback) => {
        try {
            const decoded = jwt.verify(token, "secretkey");
            callback("valid");
        } catch (error) {
            callback(error.message);
        }
    }
}