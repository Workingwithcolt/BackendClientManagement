const express = require("express");
const authRoutes = require("./routes/authroutes")
const userRoutes = require("./routes/Users")
const accountRoutes = require('./routes/Account')
const fileRoutes = require('./routes/file')
const port = 3000;
const cors = require("cors")
const app = express();//middle ware
const multer = require('multer')
const path = require('path')        

const bodyParser = require('body-parser')//neating and cleaning 
const corsOptions = {
    origin: 'http://localhost:19006',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
//   app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });
require('./db');
require('./models/Users');
require("./models/ModalDataSchema")

const requireToken = require('./Middlewares/AuthTokenRequired');
const { mongodbMiddleware } = require('./MongoDB/Mongodbmiddleware');
app.use(bodyParser.json())//server se jo data ata hei voh json mei aa jaye so

app.use(mongodbMiddleware)
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/account", accountRoutes)
app.use("/file", fileRoutes)
app.use(express.static('public/Images'))


app.get('/', requireToken, (req, res) => {
    res.send(req.user);
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})