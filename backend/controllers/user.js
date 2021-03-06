const {errorHandler} = require('../helpers/dbErrorHandler');
const User = require('../models/user');
const Auction = require('../models/auction');

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
    if (Auction.exists({buyer: req.profile})) {
        return res.status(400).json({
            message: 'Can not delete. There are auctions referencing this user!'
        });
    } else {
        User.findByIdAndDelete(req.profile._id, (err, user) => {
            if (err) return errorHandler(res, err);
            user.password = undefined;
            res.json(user);
        });
    }
};
//Fetch all suscribed users
exports.listSub = (req, res) => {
    User.find({'premium': true}, {'email': 1, _id: 0}, function (err, data) {
        if (err) console.log("can't get user emails for mass mailing")
        res.json(data)
    })
};



