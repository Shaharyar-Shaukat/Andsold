const { Order } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('auctions.auction', 'name price')
        .exec((err, order) => {
            if (err || !order) return errorHandler(res, err);
            req.order = order;
            next();
        });
};

exports.create = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, query_result) => {
        if (err) return errorHandler(res, err);
        res.json(query_result);
    });
};

// TODO: sorting?
exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .exec((err, orders) => {
            if (err) return errorHandler(res, err);
            res.json(orders);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) return errorHandler(res, err);
        res.json(order);
    });
};
