const Product = require("../schemas/productSchema");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: "Server error: Unable to get products" });
    }
};

exports.createNewProduct = async (req, res) => {
    const { name, description, price, imageUrl } = req.body;

    if (!name || !description || !price || !imageUrl) {
        res.status(200).json({
            message: "You need to fill in all the fields",
        });
    }

    try {
        const product = await Product.create({ name, description, price, imageUrl });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: "Unable to create product" });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(200).json({ message: "Can't find product / Internal Server Error" });
    }
};

exports.updateProductById = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, imageUrl } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, imageUrl },
            { new: true }
        );

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            deletedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Unable to delete product",
        });
    }
};
