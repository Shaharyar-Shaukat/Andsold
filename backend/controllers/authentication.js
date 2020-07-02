const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) return errorHandler(res, err);
        user.password = undefined;
        user.salt = undefined;
        res.json({user});
    });
};

exports.signin = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if (err || !user) return errorHandler(res, err);
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) {
                return res.status(401).json({
                    error: 'Wrong Password'
                });
            } else {
                // TODO: Tokens should expire, but should also get refreshed if the user is active.
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
                res.cookie('t', token, {expire: new Date() + 9999});
                const {_id, name, email, role} = user;
                return res.json({accessToken: token, user: {_id, email, name, role}});
            }
        });
    });
};

// TODO: some routes need to be protected in the future
const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// TODO: isAdmin for user endpoint

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({message: 'Signout successful'});
};
