const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/images'});

const { auctionById, list, create, read, update, remove, listRelatedAuction, getImage } = require('../controllers/auction');
const { userById } = require('../controllers/user');
const { categoryByName } = require('../controllers/category');
const { authenticate, authorize} = require('../controllers/authentication');

// TODO: bidding
//router.get('/makeBid/:userId', auctions);

// TODO: search
//router.post('/search', search);

router.get('/list', list);

router.post('/create/:userId', authenticate, upload.single('photo'), create);
router.get('/:auctionId', read);
router.put('/:auctionId/:userId', authenticate, authorize, update);
router.delete('/:auctionId/:userId', authenticate, authorize, remove);
router.get("/related/:auctionId", listRelatedAuction);

router.get('/image/:auctionId', getImage);


router.param('userId', userById);
router.param('auctionId', auctionById);

module.exports = router;
