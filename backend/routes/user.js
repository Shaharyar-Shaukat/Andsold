const express = require("express");
const router = express.Router();

const { userById, read, update, remove } = require('../controllers/user');
const { verifyJwt } = require('../controllers/authentication')

//no "create" because this is handled by the authentication controller
router.get('/user/:userId', verifyJwt, read);
router.put('/user/:userId', verifyJwt, update);
router.delete('/user/:userId', verifyJwt, remove);

router.param('userId', userById);

module.exports = router;
