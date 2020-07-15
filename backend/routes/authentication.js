const express = require('express');
const router = express.Router();

const { userSignupValidator } = require('../helpers/validator');
const { signup, signin, signout } = require('../controllers/authentication');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.post('/signout', signout);
// TODO: authorization

module.exports = router;
