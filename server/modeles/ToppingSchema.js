const mongoose = require("mongoose")

const toppingsSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
        // unique:true
    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

module.exports = toppingsSchema