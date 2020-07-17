const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/images'});

const { auctionById, list, create, read, update, remove, bid } = require('../controllers/auction');
const { authenticate } = require('../controllers/authentication');

// list Items
router.get('/list', list);

// CRUD for Auctions
router.post('/create', authenticate, upload.single('photo'), create);
router.get('/:auctionId', read);
router.put('/:auctionId', authenticate, update);
router.delete('/:auctionId', authenticate, remove);

// Bidding
router.post('/:auctionId/bid', authenticate, bid);

router.param('auctionId', auctionById);

module.exports = router;
