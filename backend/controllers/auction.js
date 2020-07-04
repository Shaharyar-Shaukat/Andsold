const Auction = require('../models/auction');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.auctionById = (req, res, next, id) => {
    Auction.findById(id)
        .populate('category')
        .exec((err, auction) => {
            if (err || !auction) {
                return res.status(400).json({
                    error: 'Auction not found'
                });
            }
            req.auction = auction;
            next();
        });
};

exports.create = (req, res) => {
    const auction = new Auction(req.body);
    auction.save((err, auction) => {
        if (err) return errorHandler(res, err);
        res.json({auction});
    });
};

exports.read = (req, res) => {
    req.auction.photo = undefined;
    return res.json(req.auction);
};

exports.update = (req, res) => {
    Auction.findByIdAndUpdate(req.auction._id, {$set: req.body}, {new: true}, (err, user) => {
        if (err) return errorHandler(res, err);
        res.json(user);
    });
};

exports.remove = (req, res) => {
    Auction.findByIdAndDelete(req.auction._id, (err, user) => {
        if (err) return errorHandler(res, err);
        res.json(user);
    });
};
