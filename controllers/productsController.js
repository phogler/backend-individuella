const {
    getAllProducts,
    createNewProduct,
    getProductById,
    updateProductById,
    deleteProductById,
} = require("../models/productModel");

const router = require("express").Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createNewProduct);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;
