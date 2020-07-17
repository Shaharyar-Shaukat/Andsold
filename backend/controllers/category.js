const Category = require('../models/category');
const Auction = require('../models/auction');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.categoryById = (req, res, next, id) => {
    Category.findById(id)
        .exec((err, category) => {
            if (!category) return res.status(400).json({error: 'Category not found'});
            if (err) return errorHandler(res, err)
            req.category = category;
            next();
        });
};

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) return errorHandler(res, err);
        res.json(data);
    });
};

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) return errorHandler(res, err);
        res.json({category});
    });
};

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.update = (req, res) => {
    Category.findByIdAndUpdate(req.category._id, {$set: req.body}, {new: true}, (err, category) => {
        if (err) return errorHandler(res, err);
        res.json(category);
    });
};

exports.remove = (req, res) => {
    if (Auction.exists({category: req.category})) {
        return res.status(400).json({
            message: 'Can not delete. There are auctions using this category!'
        });
    } else {
        Category.findByIdAndDelete(req.category._id, (err, category) => {
            if (err) return errorHandler(res, err);
            res.json(category);
        });
    }
};

