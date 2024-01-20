const router = require("express").Router();
const clothingItem = require("./clothingItem");
const user = require("./user")
const { HTTP_NOT_FOUND } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  res.status(HTTP_NOT_FOUND).send({ message: 'Router not found'});
});

module.exports = router;
