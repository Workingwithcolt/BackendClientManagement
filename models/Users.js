const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }

})
  userSchema.pre('save',async function (next){
    const user = this;
    console.log("original password",user.password);
    next();
  })
mongoose.model("User",userSchema)


