const Auction = require('../models/auction');
const {errorHandler} = require('../helpers/dbErrorHandler');
//const getmail = require('./api')
const User = require('../models/user');
const {listSub} = require('./user')


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
    req.body.owner = req.params.userId;
    const auction = new Auction(req.body);
    auction.
    auction.save((err, auction) => {
        if (err) return errorHandler(res, err);
        res.json({auction});
        const data = getmail()
    });
};

exports.read = (req, res) => {
    return res.json(req.auction);
};

const getmail =()=>{
    return listSub
}

exports.update = (req, res) => {
    Auction.findByIdAndUpdate(req.auction._id, {$set: req.body}, {new: true}, (err, auction) => {
        if (err) return errorHandler(res, err);
        res.json(auction);
        var x
        User.find({'premium': true}, function(err,data){
            if(err) console.log("can't get user emails for mass mailing")
                x = json(data)                
        })

    });
};

exports.remove = (req, res) => {
    Auction.findByIdAndDelete(req.auction._id, (err, auction) => {
        if (err) return errorHandler(res, err);
        res.json(auction);
    });
};
