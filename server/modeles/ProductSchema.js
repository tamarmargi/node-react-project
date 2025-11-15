const mongoose = require("mongoose")
const extrasSchema = require("./ExtrasSchema")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        // required:true,
        // unique:true
        
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        // required: true
    },
    extras:{
       type:[extrasSchema],
       default:[]
    }
}, {
    timestamps: true
})

module.exports = productSchema;