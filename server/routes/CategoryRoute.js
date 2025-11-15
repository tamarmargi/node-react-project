const express = require("express")
const router = express.Router()

const categoriesController = require("../controllers/CategoriesController")

router.get("/", categoriesController.getAllCategory)
router.post("/",categoriesController.createCategory)
router.delete("/:id",categoriesController.deleteCategory)
router.post("/update", categoriesController.updateCategory)
router.get("/:id", categoriesController.findCategoryById)

module.exports = router