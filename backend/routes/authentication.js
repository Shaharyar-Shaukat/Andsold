const express = require("express");
const router = express.Router();



const { signup } = require("../controllers/authentication.js");
const { userSignupValidator } = require('../helpers/validator');

router.post("/signup",userSignupValidator,signup);

module.exports = router; 
