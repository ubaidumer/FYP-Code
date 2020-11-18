const mongoose = require("mongoose");
const orderHistory= mongoose.model("OrderHistory",mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required:true
    },
    customeremail: {
      type: String,
      ref: "Customer",
      required: true
    },
    title:{
      type: String,
      maxlenght: 255,
      required: true

  },
  servicetype: {
    type: String,
    maxlenght: 255,
    required: true
  }, 
  location: {
    type: String,
    maxlenght: 255,
    required: true

  },   
   perhour: {
    type: Number,
    maxlenght:7,
},
permonth: {
  type: Number,
  maxlenght:7,
},
pertask: {
  type: Number,
  maxlenght:7,
},
    starttime: {
      type: String,
      required: true

  },
    endtime: {
      type: String,
      required: true

  },
  month:{
    type: Number,
    required: true

  },
  description: {
    type: String,
    maxlenght: 255,
},
      status: {
      type: String,
      maxlenght: 255,
  },  
  accepttaskdate:{
    type: String,
    maxlenght: 255,
  },  
  endtaskdate:{
    type: String,
    maxlenght: 255,
  },
     serviceprovider:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "ServiceProvider",
       required: true       
  },
  serviceprovideremail:{
    type: String,
    ref: "ServiceProvider",
    required: true       
},  
isRated:{
  type: String,
  maxlenght: 255,
  required:true
}
  })
);

exports.OrderHistory=orderHistory;
