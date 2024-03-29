const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");
const { auth } = require("../middlewares/auth");
// CRUD

// Create
router.post("/", auth, createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:itemId/likes", auth, likeItem);

// Delete
router.delete("/:itemId", auth, deleteItem);
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
