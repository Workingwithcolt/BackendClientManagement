const createError = require("http-errors");
const express = require("express");
const authRoutes = require("./routes/authroutes.js")
const userRoutes = require("./routes/Users.js")
const accountRoutes = require('./routes/Account.js')
const fileRoutes = require('./routes/file.js')
const indexRouter = require('./routes/index.js')
const port = 3000;
const cors = require("cors")
const app = express();//middle ware
const multer = require('multer')
const path = require('path')

// origin: 'http://localhost:19006',
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
//   app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });
require('./db.js');
require('./models/Users.js');
require("./models/ModalDataSchema.js")
console.log("after 30");
const requireToken = require('./Middlewares/AuthTokenRequired.js');
const { mongodbMiddleware } = require('./MongoDB/Mongodbmiddleware.js');
const bodyParser = require("body-parser");

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static('public/Images'))
app.use(mongodbMiddleware)
console.log("after 38");
app.use("/", indexRouter);
console.log("after 40");
app.use("/auth", authRoutes)
console.log("after 42");
app.use("/users", userRoutes)
console.log("after 44");
app.use("/account", accountRoutes)
console.log("after 46");
app.use("/file", fileRoutes)

console.log("after 49");
app.get('/', requireToken, (req, res) => {
    res.send(req.user);
})


app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.send(res.locals.error);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})