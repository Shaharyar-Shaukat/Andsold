const { errorHandler } = require('../helpers/dbErrorHandler');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) return errorHandler(res, err);
        user.password = undefined;
        res.json({user});
    });
};

exports.signin = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if (!user) return res.status(404).json({error: 'Email does not exist'});
        if (err) return errorHandler(res, err);
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) {
                return res.status(401).json({ error: 'Wrong Password' });
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

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.auth = user;
            req.isAuthenticated = true;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

/*
    Checks if the User ID set in URL path (:userId) is equal to the one that te JWT belongs to
 */
exports.authorize = (req, res, next) => {
    let authorized = req.profile && req.profile._id.equals(req.auth._id);
    if (!authorized) return res.status(403).json({ error: 'Access denied' });
    next();
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({message: 'Signout successful'});
};
