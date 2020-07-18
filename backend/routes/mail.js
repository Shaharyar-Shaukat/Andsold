const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { sendUpdate } = require('../controllers/mail');
const { authenticate} = require('../controllers/authentication');

router.post('/mail',authenticate, sendUpdate);

module.exports = router