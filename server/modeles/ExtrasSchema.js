const mongoose = require("mongoose")
const toppingsSchema = require("../modeles/ToppingSchema")

const extarsSchema= new mongoose.Schema({
    title:{
        type:String,
        // required:true,
        // unique:true
    },
    toppings:{
        type:[toppingsSchema],
        default:[]
    }
},{
    timestamps:true
})

module.exports=extarsSchema

