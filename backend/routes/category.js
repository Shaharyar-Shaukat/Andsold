const express = require('express');
const router = express.Router();

const { categoryById, list, create, read, update, remove } = require('../controllers/category');
const { userById } = require('../controllers/user');
const { verifyJwt } = require('../controllers/authentication');

router.get('/list', list);

router.post('/create/:userId', verifyJwt, create);
router.get('/:categoryId', read);
router.put('/:categoryId/:userId', verifyJwt, update);
router.delete('/:categoryId/:userId', verifyJwt, remove);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
