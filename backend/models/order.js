const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const OrderSchema = new mongoose.Schema(
    {
        auction: {
            type: ObjectId,
            ref: 'Auction',
            required: true,
            unique: true
        },
        transaction_id: {
            type: String,
            unique: true
        },
        status: {
            type: String,
            default: 'Not processed',
            enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Order', OrderSchema);
