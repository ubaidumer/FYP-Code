const mongoose = require("mongoose")
const Joi = require("joi")

const customer = mongoose.model("Customer", mongoose.Schema({
    firstname: {
        type: String,
        maxlenght: 255,
        required: true
    },
    lastname: {
        type: String,
        maxlenght: 255,
        required: true
    },
    email: {
        type: String,
        maxlenght: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlenght: 4,
        maxlenght: 1024,
        required: true
    },
    contactno: {
        type: Number,
        minlenght: 11,
        maxlenght: 255,
        required: true
    },
    image: {
        type: String,
        unique: true
    },code:{type:Number}
}))

function validateCustomer(customer) {

    const Schema = Joi.object({
        firstname: Joi.string().max(255).required(),
        lastname: Joi.string().max(255).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().max(255).min(8).required(),
        contactno: Joi.number().min(11).required(),
        image: Joi.string()
    })
    return Schema.validate(customer)
}
function validateLogin(customer) {

    const Schema = Joi.object({
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    })
    return Schema.validate(customer)
}

exports.Customer = customer;
exports.validateCustomer = validateCustomer;
exports.validateLogin = validateLogin