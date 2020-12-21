const mongoose = require("mongoose");

const cprofile = mongoose.model("CProfile",mongoose.Schema({

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required:true
      },
      customername:{
          type: String,
          required:true
      },
    taskcompleted:{
        type:Number,
        required:false
    },
    creditspent:{
        type:Number,
        required:false
    },
    joindate:{
    type: String,
    required:true
    },
    imageURL: {
        type: String,
        unique: true
    },
    imageCLOUDID:{
        type:String,
        unique:true
    }
}));
exports.CProfile=cprofile;
