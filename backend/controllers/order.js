const Order = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('auction', '_id name lastBid')
        .exec((err, order) => {
            if (err || !order) return errorHandler(res, err);
            req.order = order;
            next();
        });
};

// TODO: sorting?
exports.list = (req, res) => {
    Order.find()
        .populate('buyer', '_id firstName lastName address')
        .exec((err, orders) => {
            if (err) return errorHandler(res, err);
            res.json(orders);
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