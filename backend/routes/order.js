const express = require('express');
const router = express.Router();

const { userById } = require('../controllers/user');
const { orderById, list, create, read, update, remove } = require('../controllers/order');
const { verifyJwt } = require('../controllers/authentication')

router.get('/list/:userId', verifyJwt, list);

router.post('/create/:userId', verifyJwt, create);
router.get('/:orderId/:userId', verifyJwt, read);
router.put('/:orderId/:userId', verifyJwt, update);
router.delete('/:orderId/:userId', verifyJwt, remove);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;
