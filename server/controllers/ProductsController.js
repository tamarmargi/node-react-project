const Categories = require("../modeles/CategoryModel")

const checkCategory = async (categoryId) => {

    if (!categoryId)
        return null
    const category = await Categories.findById(categoryId).exec()
    if (!category) {
        return null
    }

    return category

}

const creatNewProducts = async (req, res) => {
    const { categoryId, name, image, description, price } = req.body

    const category = await checkCategory(categoryId)
    if (!category) {
        return res.status(400).send("category not fount")
    }

    if (!name || !price) {
        return res.status(400).send("name or price is reqired ")
    }
    const newProduct = { name, image, description, price }
    category.products = [...category.products, newProduct]
    await category.save()
    return res.json(newProduct)
}

const deletProduct = async (req, res) => {
    const { categoryId, productId } = req.params

    const category = await checkCategory(categoryId)
    if (!category) {
        return res.status(400).send("category not fount")
    }
    if (!productId) {
        return res.status(400).send("productId is required")
    }
    const product = category.products.id(productId)
    if (!product) {
        return res.status(400).send("no product")
    }
    await product.deleteOne()
    await category.save()
    return res.send("deleted")

}

const updateProduct = async (req, res) => {
    const { categoryId, productId, name, image, description, price } = req.body
    const category = await checkCategory(categoryId)
    if (!category) {
        return res.status(400).send("category not fount")
    }
    if (!productId) {
        return res.status(400).send("productId is required")
    }
    const product = category.products.id(productId)
    if (!product) {
        return res.status(400).send("no product")
    }
    if (name)
        product.name = name
    if (image)
        product.image = image
    if (description)
        product.description = description
    if (price)
        product.price = price
    await category.save()
    return res.json(product)
}

const getProductById = async (req, res) => {
    const { categoryId, productId } = req.params
    const category = await checkCategory(categoryId)
    if (!category) {
        return res.status(400).send("category not fount")
    }
    if (!productId) {
        return req.status(400).send("productId is required")
    }
    const product = category.products.id(productId)
    if (!product) {
        return res.status(400).send("no product")
    }
    return res.json(product)
}


module.exports = { creatNewProducts, deletProduct, updateProduct, getProductById }