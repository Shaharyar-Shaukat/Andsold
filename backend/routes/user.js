const express = require('express');
const router = express.Router();

const { userById, read, update, remove, listSub } = require('../controllers/user');
const { authenticate, authorize } = require('../controllers/authentication');

// no 'create' because this is handled by the authentication controller, otherwise CRUD for users
router.get('/:userId', authenticate, authorize, read);
router.put('/:userId', authenticate, authorize, update);
router.delete('/:userId', authenticate, authorize, remove);

router.get('/list/:userId', authenticate, authorize, listSub);

router.param('userId', userById);

module.exports = router;
