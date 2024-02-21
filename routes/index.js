const router = require("express").Router();
const {  createUser, login } = require("../controllers/user");
const userRouter = require("./user");
const itemRouter = require("./clothingItem");
const { HTTP_NOT_FOUND } = require("../utils/errors");

router.post('/signin', login);
router.post('/signup', createUser);

router.use("/items", itemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res
    .status(HTTP_NOT_FOUND)
    .send({ message: "Requested resource not found." });
});

module.exports = router;