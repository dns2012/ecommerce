const express   = require("express");

const app       = express();

const port      = process.env.PORT || 3000;;

app.listen(port);

const morgan    = require("morgan");
const bodyParser = require("body-parser");

const authController = require("./controllers/auth");
const userController = require("./controllers/user");
const productController = require("./controllers/product");


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
app.use("/auth", authController);
app.use("/user", userController);
app.use("/product", productController);

// PUBLIC STATIC DIRECTORY
// app.use(express.static(process.env.PWD + "/public"))


app.get("/", (req, res, next) => {
    res.send("ECOMMERCE RESTFUL API");
})