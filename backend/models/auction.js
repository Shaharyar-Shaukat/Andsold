const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema(
    {
        imagePath: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        // TODO: connect Bids to bids Schema
        bids: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema,
            ref: "Category",
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Auction', auctionSchema);
