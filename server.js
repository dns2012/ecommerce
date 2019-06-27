const express   = require("express");

const app       = express();

const port      = process.env.PORT || 3030;;

app.listen(port);

const morgan    = require("morgan");
const bodyParser = require("body-parser");

// BUYER ROUTER
const authBuyer = require("./controllers/buyer/auth");
const userBuyer = require("./controllers/buyer/user");
const productBuyer = require("./controllers/buyer/product");
const shipmentBuyer = require("./controllers/buyer/shipment");
const addressBuyer = require("./controllers/buyer/address");
const categoryBuyer = require("./controllers/buyer/category");
const cartBuyer = require("./controllers/buyer/cart");
const checkoutBuyer = require("./controllers/buyer/checkout");

const authSeller = require("./controllers/seller/auth");
const categorySeller = require("./controllers/seller/category");
const productSeller = require("./controllers/seller/product");
const userSeller = require("./controllers/seller/user");
const addressSeller = require("./controllers/seller/address");

// CROSS ORIGIN
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
        return res.status(200).json();
    }
    next();
})

// BODY PARSER 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// MORGAN (FOR LOGING)
app.use(morgan("dev"));

// ROUTES
app.use("/buyer/auth", authBuyer);
app.use("/buyer/user", userBuyer);
app.use("/buyer/product", productBuyer);
app.use("/buyer/shipment", shipmentBuyer);
app.use("/buyer/address", addressBuyer);
app.use("/buyer/category", categoryBuyer);
app.use("/buyer/cart", cartBuyer);
app.use("/buyer/checkout", checkoutBuyer);

app.use("/seller/auth", authSeller);
app.use("/seller/category", categorySeller);
app.use("/seller/product", productSeller);
app.use("/seller/user", userSeller);
app.use("/seller/address", addressSeller);


// PUBLIC STATIC DIRECTORY
app.use(express.static(process.env.PWD + "/public"))


app.get("/", (req, res, next) => {
    res.send("ECOMMERCE RESTFUL API");
})
