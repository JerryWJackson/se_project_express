const router = require("express").Router();
const { getUser, updateProfile } = require("../controllers/user");
const { auth } = require("../middleware/auth");

router.get("/me", auth, getUser);
router.patch("/me", auth, updateProfile);

module.exports = router;
