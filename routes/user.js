const router = require("express").Router();

const { getUsers, getUser, createUser } = require("../controllers/user");
// getUsers 'get a list of all users'
router.get('/', getUsers);

// getUser 'get a user by id'
router.get('/:userId', getUser);

// createUser 'create a new user'
router.post('/', createUser);

module.exports = router;