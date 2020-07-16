const express = require('express');
const router = express.Router();

const { orderById, listBought, listSold, create, read, update, remove } = require('../controllers/order');
const { authenticate } = require('../controllers/authentication')

router.get('/list/bought', authenticate, listBought);
router.get('/list/sold', authenticate, listSold);

router.post('/create', authenticate, create);
router.get('/:orderId', authenticate, read);
router.put('/:orderId', authenticate, update);
router.delete('/:orderId', authenticate, remove);

router.param('orderId', orderById);

module.exports = router;
