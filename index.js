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

const bodyParser = require('body-parser')//neating and cleaning 
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

const requireToken = require('./Middlewares/AuthTokenRequired.js');
const { mongodbMiddleware } = require('./MongoDB/Mongodbmiddleware.js');
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true, parameterLimit: 50000}));
app.use(bodyParser.json())//server se jo data ata hei voh json mei aa jaye so
app.use(express.static('public/Images'))
app.use(mongodbMiddleware)
app.use("/", indexRouter);
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/account", accountRoutes)
app.use("/file", fileRoutes)


app.get('/', requireToken, (req, res) => {
    res.send(req.user);
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})