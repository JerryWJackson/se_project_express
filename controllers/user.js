const User = require("../models/user");

const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);


  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((e) => {
      res
        .status(500)
        .send({ message: "Error creating user with createUser", e });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      res.status(500).send({ message: "Error reading user with getUser", e });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({users}))
    .catch((e) => {
      res.status(500).send({ message: "Error reading users with getUsers", e });
    });
};

module.exports = {
  createUser,
  getUser,
  getUsers,
};