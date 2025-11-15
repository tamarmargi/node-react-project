const mongoose = require("mongoose")
const busketSchema = require("../modeles/BusketModel")


const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        // lowercase:true,
        // trim:true

    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        // lowercase:true,
        // trim : true
    },
    phone:{
        type:String
    },
    roles:{
        type:String,
        enum:['User','Admin','Guest'],
        default:"User",
    },
    active:{
        type:Boolean,
        default:true
    }
    // basket:{
    //     type:busketSchema, 
    // }

},{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema)