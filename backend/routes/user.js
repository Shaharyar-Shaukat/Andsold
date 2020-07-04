const express = require("express");
const router = express.Router();

const { userById, read, update, remove } = require('../controllers/user');
const { verifyJwt } = require('../controllers/authentication')

// TODO: List users?
// TODO: no "create" because this is handled by the authentication controller. Should create be moved here?
router.get('/user/:userId', verifyJwt, read);
router.put('/user/:userId', verifyJwt, update);
router.delete('/user/:userId', verifyJwt, remove);

router.param('userId', userById);

module.exports = router;
