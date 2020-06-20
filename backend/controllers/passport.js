const User = require('../models/user');
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { errorHandler } = require('../helpers/dbErrorHandler');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);

    });
});

passport.use(
    new LocalStrategy(
        {usernameField: "email", passReqToCallback : true},
        function(req, email, password, done) {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        const newUser = new User({email, password});
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.firstName = req.body.firstName;
                                newUser.lastName = req.body.lastName;
                                newUser
                                    .save()
                                    .then(user => {
                                        return done(null, user);
                                    })
                                    .catch(err => {
                                        return done(null, false, {message: errorHandler(err)});
                                    });
                            });
                        });
                    } else {
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, {message: "Wrong Password"});
                            }
                        });
                    }
                })
                .catch(err => {
                    return done(null, false, {message: err});
                });
        }
    ));

module.exports = passport;
