const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/images'});

const { auctionById, create, read, update, remove } = require('../controllers/auction');
const { userById } = require('../controllers/user');
const { categoryByName } = require('../controllers/category');
const { authenticate, authorize} = require('../controllers/authentication');

// TODO: list (maybe sorted)
// TODO: search
// TODO: bidding
//router.get('/list', auctions);
//router.post('/search', search);

router.post('/create/:userId', authenticate, upload.single('photo'), create);
router.get('/:auctionId', read);
router.put('/:auctionId/:userId', authenticate, authorize, update);
router.delete('/:auctionId/:userId', authenticate, authorize, remove);

router.param('userId', userById);
router.param('auctionId', auctionById);

module.exports = router;
