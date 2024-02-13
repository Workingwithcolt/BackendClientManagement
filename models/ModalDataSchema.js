const mongoose = require('mongoose');
const modalDataSchema = new mongoose.Schema({
 
    title:{
      type:String
    } ,
    clientName:{
      type:String

    } ,
    projectType:{
      type:String

    } ,
    projectHead:{
      type:String

    } ,
    rccDesignerName:{
      type:String

    } ,
    model3D:{
      type:String

    } ,
    buildingApproval:{
      type:String

    } ,
    plinth:{
      type:String

    } ,
    buildingCompletion:{
      type:String
    } ,
    pan: {
      type:String
    },
    aadhar:{
      type:String
    } ,
    pin:{
      type:String
    } ,
    email:{
      type:String
    } 
  });
  modalDataSchema.pre('save',async function (next){
    const modalDataSchema = this;
    console.log(modalDataSchema);
    next();
  })
mongoose.model("ModalDataSchema",modalDataSchema)