const express = require('express');
const router = express.Router();

const { userById } = require('../controllers/user');
const { orderById, list, create, read, update, remove } = require('../controllers/order');
const { authenticate, authorize } = require('../controllers/authentication')

router.get('/list/:userId', authenticate, list);

router.post('/create/:userId', authenticate, create);
router.get('/:orderId/:userId', authenticate, authorize, read);
router.put('/:orderId/:userId', authenticate, authorize, update);
router.delete('/:orderId/:userId', authenticate, authorize, remove);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;
