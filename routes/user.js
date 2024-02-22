const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/user");
const { auth } = require("../middleware/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateProfile);

module.exports = router;
