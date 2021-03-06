const Auction = require('../models/auction');
const Order = require('../models/order');
const {errorHandler} = require('../helpers/dbErrorHandler');
const fs = require('fs');


/*
    Search for the auction according to the param auctionId
    Set req.auction to that auction object of found
 */
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


/*
    List all auctions, parameters are 'sortBy', 'order' and 'limit'
    Example: /list?sortBy=createdAt&order=desc&limit=4
    @return array of Auction objects
 */
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    Auction.find()
        .populate('category')
        .sort([[sortBy, order]])
        .limit(parseInt(limit))
        .exec((err, products) => {
            if (err) return res.status(400).json({error: 'No auctions found'})
            res.json(products);
        });
};


/*
    Create a new auction and save it to the database.
    @return new auction
 */
exports.create = (req, res) => {
    // Handle backened 
    if (!req.body.category) return res.status(400).json({error: 'Category Required'});
    if (!req.body.title) return res.status(400).json({error: 'Title Required'});
    if (!req.file) return res.status(400).json({error: 'Product Image Required'});

    req.body.imagePath = req.file.path;
    req.body.owner = req.auth._id;
    const auction = new Auction(req.body);
    auction.save((err, auction) => {
        if (err) return errorHandler(res, err);
        res.json({auction});
    });
};


/*
    @return requested auction
 */
exports.read = (req, res) => {
    return res.json(req.auction);
};


/*
    Find and update the auction according to the param auctionId and update values according to req.body
    @return updated auction
 */
exports.update = (req, res) => {
    Auction.findByIdAndUpdate(req.auction._id, {$set: req.body}, {new: true}, (err, auction) => {
        if (err) return errorHandler(res, err);
        res.json(auction);
    });
};


/*
    Find and remove an auction according to the param auctionId and remove it if no order is relating to it
    @return deleted auction
 */
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


/*
    Bid will be made by the authenticated user. A user can not outbid itself.
    @return: The new price of the item if the bid was successful
 */
exports.bid = (req, res) => {
    Auction.findOneAndUpdate(
        {_id: req.auction._id, buyer: {$ne: req.auth._id}, price: {$lt: req.body.price}},
        {$set: {price: req.body.price, buyer: req.auth._id}},
        {new: true},
        (err, auction) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            if (!auction) return res.json({error: 'Bid not successful. Are you trying to outbid yourself?'});
            res.json(auction)
        });
};


exports.listRelatedAuction = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 4;
    Auction.find({_id: {$ne: req.auction}, category: req.auction.category})
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, auctions) => {
            if (err || auctions.length == 0) {
                return res.status(400).json({
                    error: 'Auction not found'
                });
            }
            res.json(auctions);
        });
};


exports.getImage = (req, res) => {
    let path = req.auction.imagePath
    fs.readFile(path, (err, content) => {
        if (err) {
            res.writeHead(400, {'Content-type': 'text/html'})
            console.log(err);
            res.end("No such image");
        } else {
            //specify the content type in the response will be an image
            res.writeHead(200, {'Content-type': 'image/png'});
            res.end(content);
        }

    });

};


exports.listRelatedAuction = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 4;
    Auction.find({_id: {$ne: req.auction}, category: req.auction.category})
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, auctions) => {
            if (err || auctions.length == 0) {
                return res.status(400).json({
                    error: 'Auction not found'
                });
            }
            res.json(auctions);
        });
};


exports.getImage = (req, res) => {
    let path = req.auction.imagePath
    fs.readFile(path, (err, content) => {
        if (err) {
            res.writeHead(400, {'Content-type': 'text/html'})
            console.log(err);
            res.end("No such image");
        } else {
            //specify the content type in the response will be an image
            res.writeHead(200, {'Content-type': 'image/png'});
            res.end(content);
        }

    });

};


exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Auction.find(findArgs)
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Auctions not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


exports.listSearchBox = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.title
    if (req.query.search) {
        // Pattern matching regular expression 
        query.title = {$regex: req.query.search, $options: 'i'};
        //query.description = { $regex: req.query.search, $options: 'i' };
        // assigne category value to query.category
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
        // find the product based on query object with 2 properties
        // search and category
        Auction.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        });
    }
};