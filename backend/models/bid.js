const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const BidSchema = new mongoose.Schema(
    {
        auction: {
            type: ObjectId,
            ref: 'Person',
            unique: true,
            required: true
        },
        bidder: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Bid', BidSchema);
