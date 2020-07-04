const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema, ref: "Auction" },
        price: Number
    }
);

const Bid = mongoose.model("Bid", BidSchema);

const OrderSchema = new mongoose.Schema(
    {
        products: [BidSchema],
        transaction_id: {},
        amount: { type: Number },
        address: String,
        status: {
            type: String,
            default: "Not processed",
            enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
        },
        updated: Date,
        user: { type: mongoose.Schema, ref: "User" }
    }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };
