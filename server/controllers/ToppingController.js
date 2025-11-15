const Categories = require("../modeles/CategoryModel")

const checkTopping=async(categoryId,productId,extraId)=>{
    if(!categoryId || !productId ||!extraId)
        return null
    const category = await Categories.findById(categoryId).exec()
    if(!category){
        return null
    }
    const product = category.products.id(productId)
    if(!product){
        return null
    }
    const extra = product.extras.id(extraId)
    if(!extra){
        return null
    }
    return {category,product,extra}
    
}

const creatNewTopping = async(req,res)=>{
    const {categoryId,productId,extraId,name}=req.body
    const {category,product,extra}=await checkTopping(categoryId,productId,extraId)
    if(!category || !product ||!extra){
        return res.status(400).send("category or product or extra not found")
    }
    if(!name ){
        return res.status(400).send("name is reqired")
    }
    const newTopping = {name}
    extra.toppings = [...extra.toppings,newTopping]
    await category.save()
    return res.json(newTopping)
}

const deleteTopping = async(req,res)=>{
     const {categoryId,productId,extraId,toppingId}=req.params
      const {category,product,extra}=await checkTopping(categoryId,productId,extraId)
    if(!category || !product ||!extra){
        return res.status(400).send("category or product or extra not found")
    }
    if(!toppingId ){
        return res.status(400).send("toppingId is reqired ")
    }
    const topping = extra.toppings.id(toppingId)
    if(!topping){
        return res.status(400).send("to topping")
    }
    await topping.deleteOne()
    await category.save()
    res.send(`${topping.name} deleted`)
}

const updateTopping = async(req,res)=>{
    const {categoryId,productId,extraId,toppingId,name,status}=req.body
     const {category,product,extra}=await checkTopping(categoryId,productId,extraId)
    if(!category || !product ||!extra){
        return res.status(400).send("category or product or extra not found")
    }
    if(!toppingId ||!name ){
        return res.status(400).send("toppingId or name is reqired ")
    }
    const topping = extra.toppings.id(toppingId)
    if(!topping){
        return res.status(400).send("to topping")
    }
    topping.name = name
    if(status)
        topping.status = status
    await category.save()
    res.send(`${topping.name} updated`)
}

const getToppingById=async(req,res)=>{
    const {categoryId,productId,extraId,toppingId}=req.body
     const {category,product,extra}=await checkTopping(categoryId,productId,extraId)
    if(!category || !product ||!extra){
        return res.status(400).send("category or product or extra not found")
    }
    if(!toppingId ){
        return res.status(400).send("toppingId is reqired ")
    }
    const topping = extra.toppings.id(toppingId)
    if(!topping){
        return res.status(400).send("to topping")
    }
    res.json(topping)

}

module.exports = {creatNewTopping,deleteTopping,updateTopping,getToppingById}