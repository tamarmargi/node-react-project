const Basket = require("../modeles/BusketModel")
const User = require("../modeles/usersModel")
const Categories = require("../modeles/CategoryModel")

const checkProduct = async (categoryId, productId) => {
    if (!categoryId)
        return null
    const category = await Categories.findById(categoryId).exec()
    if (!category) {
        return null
    }
    const product = category.products.id(productId)
    if (!product) {
        return null
    }
    return { product }
}

const createBasket = async (req, res) => {
    const userId = req.user._id
    if (!userId) {
        return null
    }
    const user = await User.findById(userId).exec()
    if (!user) {
        return null
    }
    const newBasket = await Basket.create({ user })
    if (!newBasket) {
        return null
    }
    return newBasket
}

const getBasket = async (req, res) => {
    const userId = req.user._id
    if (!userId) {
        return res.status(400).send("userId is required")
    }
    const basket = await Basket.findOne({ user: userId }).populate("user").lean()
    if (!basket) {
        return res.status(400).send("no basket")
    }
    return res.json(basket)
}

const addToBasket = async (req, res) => {
    const userId = req.user._id
    const { categoryId, productId } = req.body
    if (!userId || !productId || !categoryId) {
        return res.status(400).send("userId and productId and categoryId are required ")
    }
    let basket = await Basket.findOne({ user: userId }).populate("user").exec()
    if (!basket) {
        basket = await createBasket(req)
    }
    if (!basket) {
        return res.status(400).send("no basket")
    }
    const { product } = await checkProduct(categoryId, productId)
    if (!product) {
        return res.status(400).send("no product")
    }
    const productInBasket = basket.products.find(
        (p) => p.productId?.toString() === productId
    )

    if (productInBasket) {
        addAmount(basket, productInBasket)
    }
    else {
        basket.products = [...basket.products, {
            productId: product._id,
            toppings: {},
            amount: 1
        }]
        await basket.save()
    }
    return res.json(basket)
}

const addToppingToBasket = async (req, res) => {
    try {
        const userId = req.user._id
        const { categoryId, productId, extraId, toppingId } = req.body
        if (!categoryId || !productId || !extraId || !toppingId) {
            return res.status(400).send("categoryId, productId, extraId, toppingId are required");
        }
        let basket = await Basket.findOne({ user: userId }).populate("user").exec();
        if (!basket) {
            return res.status(400).send("No basket found for user");
        }
        const productInBasket = basket.products.find(
            (p) => p.productId?.toString() === productId
        )
        if (!productInBasket) {
            return res.status(400).send("Product not found in basket");
        }
        const { product } = await checkProduct(categoryId, productId);
        if (!product) {
            return res.status(400).send("Product does not exist in category");
        }

        const extra = product.extras.id(extraId);
        if (!extra) {
            return res.status(400).send("Extra not found in product");
        }

        const topping = extra.toppings.id(toppingId);
        if (!topping) {
            return res.status(400).send("Topping not found in extra");
        }

        // עדכון toppings במוצר בסל
        productInBasket.toppings = {
            ...productInBasket.toppings,
            [toppingId]: !productInBasket.toppings?.[toppingId] || false
        }

        await basket.save();

        // אם רוצים להחזיר סל מעודכן עם populate
        basket = await Basket.findById(basket._id).populate("user").exec();

        return res.json(basket);

    } catch (error) {
        console.error("Error in addToppingToBasket:", error);
        return res.status(500).send("Server error");
    }
};



const deleteProductFromBasket = async (req, res) => {
    const userId = req.user._id
    const { productId } = req.params
    if (!userId || !productId) {
        return res.status(400).send("userId and productId are required ")
    }
    const basket = await Basket.findOne({ user: userId }).exec()
    if (!basket) {
        return res.status(400).send("no basket")
    }
    const productInBasket = basket.products.find(
        (p) => p.productId?.toString() === productId
    )
    if (!productInBasket) {
        return res.status(400).send("Product not found in basket");
    }
    basket.products.pull(productInBasket._id);
    await basket.save();
    return res.send("Product deleted ");
}

const addAmount = (basket, product) => {
    product.amount += 1
    basket.save()
}

const lessAmount = async (req, res) => {
    const { basketId, productId } = req.body
    if (!basketId || !productId) {
        return res.status(400).send("basketId and productId are required ")
    }
    let basket = await Basket.findById(basketId)
    if (!basket) {
        return res.status(400).send("no basket")
    }
    const productInBasket = basket.products.find(
        (p) => p.productId?.toString() === productId
    )    
    if (!productInBasket) {
        return res.status(400).send("no product")
    }
    productInBasket.amount -= 1
    basket.save()
}



module.exports = {
    createBasket,
    getBasket,
    addToBasket,
    deleteProductFromBasket,
    addToppingToBasket,
    lessAmount
}



