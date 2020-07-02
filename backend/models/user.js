const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            trim: true,
            maxlength: 12
        },
        premium: {
            type: Boolean,
            default: false
        },
        purchaseHistory: {
            type: Array,
            default: []
        },
        listHistory: {
            type: Array,
            default: []
        },
        image: {}
    },
    { timestamps: true }
);

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password,10, function(err, hashedPassword) {
        if (err) return next(err);
        user.password = hashedPassword;
        next();
    });
});

module.exports = mongoose.model('User', UserSchema);

