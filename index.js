const express = require('express');
const port =3000;
const cors=require("cors")
const app = express();//middle ware

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
const authRoutes = require('./routes/authroutes');
const requireToken  = require('./Middlewares/AuthTokenRequired');
app.use(bodyParser.json())//server se jo data ata hei voh json mei aa jaye so
app.use(authRoutes);


app.get('/',requireToken, (req,res)=>{
    
    console.log(req.user);
    res.send(req.user);
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})