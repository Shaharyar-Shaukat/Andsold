const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: String,
        premium: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hashedPassword) {
        if (err) return next(err);
        user.password = hashedPassword;
        next();
    });
});

module.exports = mongoose.model('User', UserSchema);

