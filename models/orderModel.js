const mongoose = require("mongoose");
const Order = require("../schemas/orderSchema");

exports.getOrder = async (req, res) => {
    const { _id } = req.userData;
    const order = await Order.findOne({ userId: _id });

    if (!order) res.status(404).json({ message: "You have no orders to show" });
    res.status(200).json(order);
};

exports.createNewOrder = async (req, res) => {
    const { productId, quantity } = req.body;
    const { _id } = req.userData;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid Product ID / Product ID does not exist" });
    }

    try {
        const order = await Order.findOneAndUpdate(
            { userId: _id },
            { $push: { orders: { product: productId, quantity: quantity } } },
            { new: true, upsert: true }
        );

        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to create order",
        });
    }
};
