const Auction = require('../models/auction');
const Order = require('../models/order');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.auctionById = (req, res, next, id) => {
    Auction.findById(id)
        .populate('category')
        .exec((err, auction) => {
            if (!auction) return res.status(400).json({error: 'Auction not found'});
            if (err) return errorHandler(res, err)
            req.auction = auction;
            next();
        });
};

exports.list = (req, res) => {
    Auction.find()
        .populate('category')
        .sort([[req.query.sortBy, req.query.order]])
        .limit(parseInt(req.query.limit))
        .exec((err, products) => {
            if (err) return res.status(400).json({error: 'No auctions found'})
            res.json(products);
        });
};

exports.create = (req, res) => {
    req.body.imagePath = req.file.path;
    req.body.owner = req.auth._id;
    const auction = new Auction(req.body);
    auction.save((err, auction) => {
        if (err) return errorHandler(res, err);
        res.json({auction});
    });
};

exports.read = (req, res) => {
    return res.json(req.auction);
};

exports.update = (req, res) => {
    Auction.findByIdAndUpdate(req.auction._id, {$set: req.body}, {new: true}, (err, auction) => {
        if (err) return errorHandler(res, err);
        res.json(auction);
    });
};

exports.remove = (req, res) => {
    if (Order.exists({auction: req.auction})) {
        return res.status(400).json({
            message: 'Can not delete. There are orders using this auction!'
        });
    } else {
        Auction.findByIdAndDelete(req.auction._id, (err, auction) => {
            if (err) return errorHandler(res, err);
            res.json(auction);
        });
    }
};

exports.bid = (req, res) => {
    Auction.findOneAndUpdate(
        {_id: req.auction._id, buyer: {$ne: req.auth._id}, price: {$st: req.body.price}},
        { $set: { status: req.body.price, buyer: req.auth._id } },
        (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        if (!order) return res.json({error: 'Bid not successful'});
        res.json(order)
    });
};
