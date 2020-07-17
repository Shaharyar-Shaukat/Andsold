const Order = require('../models/order');
const Auction = require('../models/auction');
const mongoose = require('mongoose');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('auction', '_id title lastBid')
        .exec((err, order) => {
            if (err || !order) return errorHandler(res, err);
            req.order = order;
            next();
        });
};

exports.listBought = (req, res) => {
    Auction.aggregate([
        {
            $match: {"buyer": mongoose.Types.ObjectId(req.auth._id)}
        },
        {
            $lookup: {
                from: "orders",
                localField: "_id",
                foreignField: "auction",
                as: "orders"
            }
        },
        {
            $replaceRoot: { newRoot: { $arrayElemAt: [ "$orders", 0 ] }}
        },
        { $project: { orders: 0 } }
    ], function(err, auctions) {
        if (err) return errorHandler(res, err);
        res.json(auctions.orders);
    });
};

exports.listSold = (req, res) => {
    Auction.aggregate([
        {
            $match: {"owner": mongoose.Types.ObjectId(req.auth._id)}
        },
        {
            $lookup: {
                from: "orders",
                localField: "_id",
                foreignField: "auction",
                as: "orders"
            }
        },
        {
            $replaceRoot: { newRoot: { $arrayElemAt: [ "$orders", 0 ] }}
        },
        { $project: { orders: 0 } }
    ], function(err, auctions) {
        if (err) return errorHandler(res, err);
        res.json(auctions);
    });
};

exports.create = (req, res) => {
    const order = new Order(req.body);
    order.save((err, query_result) => {
        if (err) return errorHandler(res, err);
        res.json(query_result);
    });
};

exports.read = (req, res) => {
    return res.json(req.order);
};

exports.update = (req, res) => {
    Order.findByIdAndUpdate(req.order._id, {$set: req.body}, {new: true}, (err, order) => {
        if (err) return errorHandler(res, err);
        res.json(order);
    });
};

exports.remove = (req, res) => {
    Order.findByIdAndDelete(req.order._id, (err, order) => {
        if (err) return errorHandler(res, err);
        res.json(order);
    });
};