const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../modeles/usersModel")

const login=async(req,res)=>{
    const {userName,password}=req.body
    if(!userName || !password){
        return res.status(400).send("all fields are required")
    }
    const fountUser = await User.findOne({userName}).lean()
    if(!fountUser || fountUser.active===false){
        return res.status(401).send("Unauthorized")
    }
    const match = await bcrypt.compare(password,fountUser.password)
    if(!match){
        return res.status(401).send("Unauthorized")
    }
    const userInfo={_id:fountUser._id,name:fountUser.name,roles:fountUser.roles,userName:fountUser.userName,email:fountUser.email}
    const accessToken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})


   
}
const register = async(req,res)=>{
    const {userName,password,name,email,phone}=req.body
    if(!userName || !password ||!name ){
        return res.status(400).send("all fields are required")
    }
    const duplicate = await User.findOne({userName}).lean()
    if(duplicate){
        return res.status(409).send("duplucate username")
    }
    const hashedPwd = await bcrypt.hash(password,10)
    const userObject = {name,email,userName,phone,password:hashedPwd}
    const user = await User.create(userObject)
    if(!user){
        return res.status(400).send("no user")
    }
    res.json(user)
}

module.exports = {login,register}