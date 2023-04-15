const mongoose = require("mongoose");

const orderRowSchema = mongoose.Schema(
    {
        product: { type: mongoose.SchemaTypes.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
    },
    { timestamps: true }
);

const orderSchema = mongoose.Schema(
    {
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
        orders: [orderRowSchema],
    },
    { timestamps: true }
);

orderSchema.pre("findOne", function () {
    this.populate("userId", "username");
});

orderSchema.pre("findOne", function () {
    this.populate("orders.product", "name price -_id");
});

module.exports = mongoose.model("Order", orderSchema);
