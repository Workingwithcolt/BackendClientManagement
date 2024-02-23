const mongoose = require('mongoose');
// AllElevation: "sd"
// AllFloorPlan: "sd"
// BuildingApprovalDate: "2024-02-01"
// ColumnFooting: "sd"
// CompletionDate: "2024-02-06"
// FileModel3D: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACDQA…AAJUj0AAAAAAAAAAAVM7/A0SGFk9CxehRAAAAAElFTkSuQmCC"]
// PleanthBeam: "sd"
// PresentationDraw: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACDQA…AAJUj0AAAAAAAAAAAVM7/A0SGFk9CxehRAAAAAElFTkSuQmCC"]
// StairCaseDraw: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACDQ
// adhar: "sdsd"
// buildingCompletionDate: "sd"
// clientName: "sd"
// email: "sdsd@gmail.com"
// firstSlab: ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD…QAlFLRQAlFLRQAlFLRQAlFLRQAlFLRQAlFLRQAlFLRQB//9k="]
// pan: "sd"
// pin: "sd"
// plinth: "sd"
// projectHead: "sdsd"
// projectType: "sdsd"
// rccDesignerName: "sd"
// title: "asd"

const modalDataSchema = new mongoose.Schema({
  title: {
    type: String
  },
  clientName: {
    type: String

  },
  projectType: {
    type: String

  },
  projectHead: {
    type: String

  },
  rccDesignerName: {
    type: String
  },
  FileModel3D: {
    type: [{
      ContentType: String,
      value: String,
      fileName:String
    }],
  },
  BuildingApprovalDate: {
    type: String
  },
  plinth: {
    type: String
  },
  buildingCompletionDate: {
    type: String
  },
  pan: {
    type: String
  },
  aadhar: {
    type: String
  },
  pin: {
    type: String
  },
  email: {
    type: String
  },
  PresentationDraw: {
    type: [{
      ContentType: String,
      value: String,
      fileName:String
    }]
  },
  ColumnFooting: {
    type: String
  },
  Slab: {
    type: [{
      ContentType: String,
      value: String,
      fileName:String
    }]
  },
  StairCaseDraw: {
    type: {
      ContentType: String,
      value: String,
      fileName:String
    }
  },
  PleanthBeam: {
    type: String
  },
  CompletionDate: {
    type: String
  },
  AllFloorPlan: {
    type: String
  },
  AllElevation: {
    type: String
  }
});
modalDataSchema.pre('save', async function (next) {
  const modalDataSchema = this;
  console.log(modalDataSchema);
  next();
})


module.exports = mongoose.model("ModalDataSchema", modalDataSchema)