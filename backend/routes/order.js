const express = require('express');
const router = express.Router();

const { userById } = require('../controllers/user');
const { orderById, listBought, listSold, create, read, update, remove } = require('../controllers/order');
const { authenticate, authorize } = require('../controllers/authentication')

router.get('/list/bought/:userId', authenticate, authorize, listBought);
router.get('/list/sold/:userId', authenticate, authorize, listSold);

router.post('/create/:userId', authenticate, create);
router.get('/:orderId/:userId', authenticate, authorize, read);
router.put('/:orderId/:userId', authenticate, authorize, update);
router.delete('/:orderId/:userId', authenticate, authorize, remove);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;
