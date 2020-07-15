exports.userSignupValidator = (req, res, next) => {
    req.check('firstName', 'First Name is required').notEmpty();
    req.check('lastName', 'Last Name is required').notEmpty();
    req.check('email', 'Email must be between 3 to 32 characters')
<<<<<<< HEAD
        .matches(/.+\@.+\..+/)
=======
        .matches(/.+@.+\..+/)
>>>>>>> john-dev
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
<<<<<<< HEAD
        .isLength({ min: 8 })
=======
        .isLength({min: 8})
>>>>>>> john-dev
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
<<<<<<< HEAD
        return res.status(400).json({ error: firstError });
=======
        return res.status(400).json({error: firstError});
>>>>>>> john-dev
    }
    next();
};
