const express = require('express');
const router = express.Router();

const { userById, read, update, remove } = require('../controllers/user');
const { verifyJwt } = require('../controllers/authentication');

// TODO: List users?

// no 'create' because this is handled by the authentication controller
router.get('/:userId', verifyJwt, read);
router.put('/:userId', verifyJwt, update);
router.delete('/:userId', verifyJwt, remove);

router.param('userId', userById);

module.exports = router;
