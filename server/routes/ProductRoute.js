const express = require("express")
const router = express.Router()
const ProductsController = require("../controllers/ProductsController")

router.post("/",ProductsController.creatNewProducts)
router.delete("/:categoryId/:productId",ProductsController.deletProduct)
router.post("/update",ProductsController.updateProduct)
router.get("/:categoryId/:productId",ProductsController.getProductById)

module.exports=router