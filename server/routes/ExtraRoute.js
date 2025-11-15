const express = require("express")
const router = express.Router()
const ExtraController = require("../controllers/extrasController") 

router.post("/",ExtraController.creatNewExtra)
router.delete("/:categoryId/:productId/:extraId",ExtraController.deletExtra)
router.post("/update",ExtraController.updateExtra)
router.get("/:categoryId/:productId/:extraId",ExtraController.getExtraById)


module.exports = router

