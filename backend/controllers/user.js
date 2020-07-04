const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.userById = (req, res, next, id) => {
    User.findById(id)
        .exec((err, user) => {
            if (err || !user) return errorHandler(res, err);
            req.profile = user;
            next();
        });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    res.json(req.profile);
};

exports.update = (req, res) => {
    User.findByIdAndUpdate(req.profile._id, {$set: req.body}, {new: true}, (err, user) => {
        if (err) return errorHandler(res, err);
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.remove = (req, res) => {
    User.findByIdAndDelete(req.profile._id, (err, user) => {
        if (err) return errorHandler(res, err);
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};