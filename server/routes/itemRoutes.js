const express = require("express");
const { createItem, getItems, updateItem, deleteItem } = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

router.post("/", createItem);
router.get("/", getItems);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);


module.exports = router;
