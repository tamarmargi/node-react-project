const express = require("express")
const router = express.Router()
const ToppingController = require("../controllers/ToppingController")

router.post("/",ToppingController.creatNewTopping)
router.delete("/:categoryId/:productId/:extraId/:toppingId",ToppingController.deleteTopping)
router.post("/update",ToppingController.updateTopping)
router.get("/",ToppingController.getToppingById)

module.exports = router