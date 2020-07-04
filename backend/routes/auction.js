const express = require("express");
const router = express.Router();

const { auctionById, create, read, update, remove} = require("../controllers/auction");
const { userById } = require("../controllers/user");
const { verifyJwt } = require("../controllers/authentication");
const { categories } = require("./categories")

router.get("/", auctions);
router.post("/search", search);
// TODO: link categories correctly
router.use("/categories", categories);

router.post("/create/:userId", verifyJwt, create);
router.get("/:auctionId", read);
router.put("/:auctionId/:userId", verifyJwt, update);
router.delete("/:auctionId/:userId", verifyJwt, remove);

router.param("userId", userById);
router.param("auctionId", auctionById);

module.exports = router;
