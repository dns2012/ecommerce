const request   = require("request");

require("dotenv").config();

module.exports = {
    getToken : (paymentAttribute, callback) => {
        let options = { 
            method: 'GET',
            url: process.env.MIDTRANS_ENDPOINT + '/v2/token',
            qs: { 
                client_key: process.env.MIDTRANS_CLIENT_KEY,
                card_number: paymentAttribute.card_number,
                card_exp_month: paymentAttribute.card_exp_month,
                card_exp_year: paymentAttribute.card_exp_year,
                card_cvv: paymentAttribute.card_cvv 
            },
            headers: {
                Authorization: 'Basic ' + process.env.MIDTRANS_SERVER_KEY_BASE64,
                'Content-Type': 'application/json',
                Accept: 'application/json' 
            } 
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            callback(body)
        });
    },

    creditCard : (bodyRequest, callback) => {
        let options = { 
            method: 'POST',
            url: process.env.MIDTRANS_ENDPOINT + '/v2/charge',
            headers: {
                Authorization: 'Basic ' + process.env.MIDTRANS_SERVER_KEY_BASE64,
                'Content-Type': 'application/json',
                Accept: 'application/json' 
            },
            body : bodyRequest
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            callback(body)
        });
    },
    
    bankTransferBCA : (bodyRequest, callback) => {
        let options = { 
            method: 'POST',
            url: process.env.MIDTRANS_ENDPOINT + '/v2/charge',
            headers: {
                Authorization: 'Basic ' + process.env.MIDTRANS_SERVER_KEY_BASE64,
                'Content-Type': 'application/json',
                Accept: 'application/json' 
            },
            body : bodyRequest
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            callback(body)
        });
    }
}