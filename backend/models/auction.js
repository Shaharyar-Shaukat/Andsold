const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const auctionSchema = new mongoose.Schema(
    {
        imagePath: String,
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ''
        },
        highest_bid: {
            type: ObjectId,
            ref: 'Bid'
        },
        category: {
            type: ObjectId,
            ref: 'Category',
            required: true
        },
        owner: {
            type: ObjectId,
            ref: 'User',
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Auction', auctionSchema);
