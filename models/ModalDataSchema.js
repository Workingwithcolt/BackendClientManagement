const mongoose = require('mongoose');
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
  siteAddress: {
    type: String

  },
  CardFile: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  Map: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  gsfile: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  gsNo: {
    type: String

  },
  mahareraNo: {
    type: String

  },
  mahareraFile: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  institudeNo: {
    type: String

  },
  panFile: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  adharFile: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  additionalDetailCommentRemark: {
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
      fileName: String
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
      fileName: String
    }]
  },
  ColumnFooting: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  Slab: {
    type: [{
      ContentType: String,
      value: String,
      fileName: String
    }]
  },
  StairCaseDraw: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  PleanthBeam: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  CompletionDate: {
    type: String
  },
  AllFloorPlan: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  toilet: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  AllElevation: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  AllElectricDrawingFile: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  AllSectionFile: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  AllGrillsAndRailingFile: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  tileLayoutFile: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  AllSectionFile: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  CompletionDrawingFile: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  SanctionDrawing: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  SanctionLetter: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  ReviseSanction: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  CompletionLetter: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  Drawing: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  pleanthCompletion: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
  ReviseSanctionLetterFile: {
    type: {
      ContentType: String,
      value: String,
      fileName: String
    }
  },
});
modalDataSchema.pre('save', async function (next) {
  const modalDataSchema = this;
  next();
})


module.exports = mongoose.model("ModalDataSchema", modalDataSchema)