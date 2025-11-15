require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOption = require("./config/corsOptions")
const connectDB = require("./config/dbConn")

const app = express()
const PORT = process.env.PORT || 2500
connectDB()

app.use(express.json())
app.use(cors(corsOption))
app.use(express.static("public"))

app.use("/api/category", require("./routes/CategoryRoute"))
app.use("/api/product",require("./routes/ProductRoute"))
app.use("/api/extras", require("./routes/ExtraRoute"))
app.use("/api/toppings",require("./routes/ToppingRoute"))
app.use("/api/auth",require("./routes/AuthRoute"))
app.use("/api/basket",require("./routes/BasketRoute"))

app.listen(PORT,()=>{
    console.log(`Server runing on port ${PORT}`);
    
})
