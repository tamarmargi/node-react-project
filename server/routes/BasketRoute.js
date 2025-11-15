const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const basketController = require("../controllers/BusketController")

// router.get("/create/:userId",verifyJWT,basketController.createBasket)
router.get("/",verifyJWT,basketController.getBasket)
router.delete("/:productId",verifyJWT,basketController.deleteProductFromBasket)
router.post("/",verifyJWT,basketController.addToBasket)
router.post("/topping",verifyJWT,basketController.addToppingToBasket)
router.post("/lessAmount",verifyJWT, basketController.lessAmount)

module.exports = router