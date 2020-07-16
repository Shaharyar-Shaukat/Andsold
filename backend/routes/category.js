const express = require('express');
const router = express.Router();

const { categoryById, list, create, read, update, remove } = require('../controllers/category');
const { userById } = require('../controllers/user');
const { authenticate } = require('../controllers/authentication');

router.get('/list', list);

router.post('/create/:userId', authenticate, create);
router.get('/:categoryId', read);
router.put('/:categoryId', authenticate, update);
router.delete('/:categoryId', authenticate, remove);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
