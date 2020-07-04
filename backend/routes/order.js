const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { orderById, list, create, getStatus, updateStatus } = require("../controllers/order");
const { verifyJwt } = require('../controllers/authentication')

router.post("/order/create/:userId", verifyJwt, create);

router.get("/order/list/:userId", verifyJwt, list);
router.get("/order/status-values/:userId", verifyJwt, getStatus);
router.put("/order/:orderId/status/:userId", verifyJwt, updateStatus);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
