const router = require("express").Router();

const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require("../controllers/clothingItem");
// CRUD

// Create
router.post("/", createItem);

// Read
router.get("/", getItems);

// Delete
router.delete("/:itemId", deleteItem);

// Add Like
router.put("/:itemId/likes", likeItem);

// Remove Like
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
