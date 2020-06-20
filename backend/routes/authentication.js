const express = require("express");
const router = express.Router();
const passport = require("passport");
const { userSignupValidator } = require('../helpers/validator');

router.post("/signup", userSignupValidator, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) {
            return res.status(400).json({errors: err});
        }
        if(info) {
            return res.status(400).json({info: info});
        }
        if(!user) {
            return res.status(400).json({errors: "No user found"});
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(400).json({errors: err});
            }
            return res.status(200).json({success: `logged in ${user.id}`});
        })
    })(req, res, next);
});



module.exports = router;
