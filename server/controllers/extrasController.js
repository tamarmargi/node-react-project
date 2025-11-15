const Categories = require("../modeles/CategoryModel")

const checkProduct = async(categoryId,productId)=>{
    if(!categoryId || !productId)
        return null
    const category = await Categories.findById(categoryId).exec()
    if(!category){
        return null
    }
    const product = category.products.id(productId)
    if(!product){
       return null
    }
    return {category,product}
}

const creatNewExtra = async(req,res)=>{
    const {categoryId,productId,title}=req.body
    
    const {category,product}=await checkProduct(categoryId,productId)
    if(!category || !product){
        return res.status(400).send("categoryId or productId not found")
    }
    if(!title){
        return res.status(400).send(" title is reqired ")
    }
    const newExtra = {title}

    product.extras = [...product.extras,newExtra]

    await category.save()
    return res.json(newExtra)
}

const deletExtra=async(req,res)=>{
    const {categoryId,productId,extraId}=req.params
    const {category,product}=await checkProduct(categoryId,productId)
    if(!category || !product){
        return res.status(400).send("categoryId or productId not found")
    }
    
    if( !extraId){
        return res.status(400).send(" extraId is required")
    }
    const extra =  product.extras.id(extraId)
    if(!extra){
        return res.status(400).send("no product")
    }
    await extra.deleteOne()
    await category.save()
    return res.send(`${extra.title} delete`)
}
const updateExtra = async(req,res)=>{
     const {categoryId,productId,extraId,title}=req.body
     const {category,product}=await checkProduct(categoryId,productId)
    if(!category || !product){
        return res.status(400).send("categoryId or productId not found")
    }
    if( !extraId || !title){
        return res.status(400).send(" extraId or title is required")
    }
     const extra = product.extras.id(extraId)
    if(!extra){
        return res.status(400).send("no product")
    }
    extra.title=title
    await category.save()
    res.send(`${extra.title} update`)
   
}

const getExtraById = async(req,res)=>{
    const {categoryId,productId,extraId}=req.params
    const {category,product}=await checkProduct(categoryId,productId)
    if(!category || !product){
        return res.status(400).send("categoryId or productId not found")
    }
    if( !extraId ){
        return res.status(400).send("extraId is required")
    }
    const extra = product.extras.id(extraId)
    if(!extra){
        return res.status(400).send("no product")
    }
    res.json(extra)
}

 
module.exports={creatNewExtra,deletExtra,updateExtra,getExtraById}