const mongoose = require("mongoose");
const Joi = require("joi");


const Ptask = mongoose.model("PrivateTask",mongoose.Schema({
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
    required: false
},
permonth: {
  type: Number,
  maxlenght:7,
  required: false
},
pertask: {
  type: Number,
  maxlenght:7,
  required: false
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
       ref: "ServiceProvider"       
  },
  serviceprovideremail:{
    type: String,
    ref: "ServiceProvider"       
}
  })
);

function validateTask(task) {

  const Schema = Joi.object({

    title: Joi.string().max(255).required(),
    servicetype: Joi.string().max(255).required(),
    location: Joi.string().max(255).required(),
    perhour: Joi.number().max(999999),
    permonth: Joi.number().max(999999),
    pertask: Joi.number().max(999999),
    starttime: Joi.string().required(),
    endtime: Joi.string().required(),
    month: Joi.number().required(),
    description: Joi.string().max(255),  
    status: Joi.string().max(255)
   
  })
  return Schema.validate(task)
}
exports.PTask=Ptask;
exports.validateTask=validateTask;