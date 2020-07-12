const {errorHandler} = require('../helpers/dbErrorHandler');
const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id)
        .exec((err, user) => {
            if (!user) return res.status(404).json({error: 'User id does not exist'});
            if (err) return errorHandler(res, err);
            req.profile = user;
            next();
        });
};

exports.read = (req, res) => {
    req.profile.password = undefined;
    res.json(req.profile);
};

exports.update = (req, res) => {
    User.findByIdAndUpdate(req.profile._id, {$set: req.body}, {new: true}, (err, user) => {
        if (err) return errorHandler(res, err);
        user.password = undefined;
        res.json(user);
    });
};

exports.remove = (req, res) => {
    User.findByIdAndDelete(req.profile._id, (err, user) => {
        if (err) return errorHandler(res, err);
        user.password = undefined;
        res.json(user);
    });
};