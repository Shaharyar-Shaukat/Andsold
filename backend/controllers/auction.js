const Auction = require('../models/auction');
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

exports.create = (req, res) => {
    req.body.imagePath = req.file.path;
    req.body.owner = req.params.userId;
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
    Auction.findByIdAndDelete(req.auction._id, (err, auction) => {
        if (err) return errorHandler(res, err);
        res.json(auction);
    });
};
