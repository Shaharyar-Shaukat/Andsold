const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/images'});


const { auctionById, list, create, read, update, remove, listRelatedAuction, bid, getImage, listBySearch,listSearchBox } = require('../controllers/auction');
const { authenticate } = require('../controllers/authentication');


// list Items
router.get('/list', list);
router.get('/search', listSearchBox);

// CRUD for Auctions
router.post('/create', authenticate, upload.single('photo'), create);
router.get('/:auctionId', read);


router.put('/:auctionId', authenticate, update);
router.delete('/:auctionId', authenticate, remove);
router.get("/related/:auctionId", listRelatedAuction);

router.get('/image/:auctionId', getImage);
router.post("/by/search", listBySearch);


router.param('auctionId', auctionById);

module.exports = router;
