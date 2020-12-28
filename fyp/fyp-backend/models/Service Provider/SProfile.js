
const mongoose = require("mongoose");

const sprofile = mongoose.model("SProfile",mongoose.Schema({

     serviceprovider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
        required:true
      },
      serviceprovidername:{
          type: String,
          required:true
      },
    ordercompleted:{
        type:Number,
        required:false
    },
    creditearn:{
        type:Number,
        required:false
    },
    servicetype:{
        type:String,
        required:false
    },
    joindate:{
    type: String,
    required:true
    },
    imageURL:{type: String},imageCLOUDID:{type: String},
    Latitude:{type: String},Longitude:{type: String}

}));
exports.SProfile=sprofile;
