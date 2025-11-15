
const Category = require("../modeles/CategoryModel")

const getAllCategory = async(req,res)=>{
    const categories = await Category.find().lean()
    if(!categories){
        return res.status(400).send("no categories")
    }
    return res.json(categories)
}

const createCategory = async(req,res)=>{
    
    const {name} = req.body
    if(!name){
        return res.status(400).send("name is required")
    }
    const existCategori = await Category.findOne({name})
    if(existCategori){
        return res.status(400).send("name categori exist")
    }
    const newCategory = await Category.create({name})
    
    if(!newCategory){

        return res.status(400).send("no category")
    }
    
    return res.json(newCategory)
}

const deleteCategory = async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).send("id is required")
    }
    const findCategory = await Category.findById(id).exec()
    if(!findCategory){
        return res.status(400).send("no category")
    }
    
    const deletCategory = await findCategory.deleteOne()
    return res.send(`${findCategory.name} deleted`)

}

const findCategoryById = async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).send("id is required")
    }
    const findCat = await Category.findById(id).lean()
    if(!findCat){
        return res.status(400).send("no category")
    }
    return res.json(findCat)
}

const updateCategory = async(req,res)=>{
    const {id,name} = req.body
    if(!id || !name){
        return res.status(400).send("id or name is required")
    }
    const findCat = await Category.findById(id).exec()
    if(!findCat){
        return res.status(400).send("no category")
    }
    findCat.name = name
    const updated = await findCat.save()
    return res.send(`${updated.name} update`)
    
}

module.exports = {getAllCategory,createCategory,deleteCategory,findCategoryById,updateCategory}