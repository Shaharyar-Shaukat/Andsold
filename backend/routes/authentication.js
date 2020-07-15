const express = require('express');
const router = express.Router();

const { userSignupValidator } = require('../helpers/validator');
const { signup, signin, signout } = require('../controllers/authentication');

<<<<<<< HEAD

const { signup } = require("../controllers/authentication.js");
const { userSignupValidator } = require('../helpers/validator');

router.post("/signup",userSignupValidator,signup);
=======
router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.post('/signout', signout);
// TODO: authorization
>>>>>>> john-dev

module.exports = router;
