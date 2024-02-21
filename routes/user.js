const router = require("express").Router();
const { getUser, updateProfile } = require("../controllers/user");
const { auth } = require("../middleware/auth");

router.get("/users/me", auth, getUser);
router.patch("/users/me", auth, updateProfile);

module.exports = router;
