const mongoose = require("mongoose");

const rating= mongoose.model("Rating",mongoose.Schema({
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
    reviewtitle: {
      type: String,
      maxlenght: 55,
      required: true
    }, 
  review: {
    type: String,
    maxlenght: 255,
    required: true
  }, 
like: {
  type: Number,
  maxlenght:7,
}, 
star: {
    type: Number,
    maxlenght:1,
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
}
  })
);

exports.Rating=rating;
