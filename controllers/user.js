const User = require("../models/user");
const { ObjectId } = require("mongodb");
const {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  // if (!name) {
  //   return res
  //     .status(HTTP_BAD_REQUEST)
  //     .send({
  //       message:
  //         "user validation failed: name: cannot be null or empty.",
  //     });
  // } else if (!length(name) > 29) {
  //   return res
  //     .status(HTTP_BAD_REQUEST)
  //     .send({
  //       message:
  //       "user validation failed: name: must be 2 or more characters long.",
  //     });
  // } else if (!length(name) > 29) {
  //   return res
  //     .status(HTTP_BAD_REQUEST)
  //     .send({
  //       message:
  //         "user validation failed: name: must be 30 or less characters long.",
  //     });
  // }

  User.create({ name, avatar })
    .then((user) => {
      console.log(user);
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      } else if (err.name === "ValidationError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      } else if (err.name === "AssertionError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      } else {
        // if no errors match, return a response with status code 500
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: err.message });
      }
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(ObjectId(userId))
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      } else if (err.name === "AssertionError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      } else if (err.name === "ValidationError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(HTTP_NOT_FOUND).send({ message: err.message });
      } else {
        // if no errors match, return a response with status code 500
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: err.message });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "DocumentNotFoundError") {
        return res.status(HTTP_NOT_FOUND).send({ message: err.message });
      } else {
        // if no errors match, return a response with status code 500
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: err.message });
      }
    });
};

module.exports = {
  createUser,
  getUser,
  getUsers,
};
