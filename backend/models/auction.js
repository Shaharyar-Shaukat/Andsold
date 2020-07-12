const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const auctionSchema = new mongoose.Schema(
    {
        // TODO: Maybe follow this https://medium.com/@nitinpatel_20236/image-upload-via-nodejs-server-3fe7d3faa642
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
