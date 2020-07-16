const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/images'});

const { auctionById, list, create, read, update, remove, bid } = require('../controllers/auction');
const { userById } = require('../controllers/user');
const { authenticate } = require('../controllers/authentication');

router.get('/list', list);

router.post('/create/:userId', authenticate, upload.single('photo'), create);
router.get('/:auctionId', read);
router.put('/:auctionId', authenticate, update);
router.delete('/:auctionId', authenticate, remove);
router.post('/:auctionId/bid', authenticate, bid);

router.param('userId', userById);
router.param('auctionId', auctionById);

module.exports = router;
