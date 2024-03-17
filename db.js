const mongoose = require('mongoose');
require('dotenv').config();


// mongoose.connect(process.env.MONGO_URL).then(
//     ()=>{
//         console.log('connected to database');
//     }
// )
// .catch((err)=>{
//     console.log(`could not connect3 to database `+ err);
// })

    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("mongodb is successfullty connected ");

        })
        connection.on('error', (err) => {
            console.log("MongoDb connection error.please make sure mongodb is running." + err);
            process.exit();
        })
    } catch (e) {
        console.log("Something went Wrong!!");
        console.log(e);
    }