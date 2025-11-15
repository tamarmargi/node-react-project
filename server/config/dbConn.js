const mongoose = require("mongoose")
const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DATABASA_URI)
        
    } catch (error) {
        console.log(error);
        
    }
}
mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB') 
})
mongoose.connection.on('error',err=>{
    console.log(err);
    
})


module.exports=connectDB