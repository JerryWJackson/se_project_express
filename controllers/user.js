const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
  AUTHORIZATION_ERROR,
  CONFLICT_ERROR,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) =>
      res
        .status(201)
        .send({ name: user.name, avatar: user.avatar, email: user.email }),
    )
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      // don't forget to figure out how to throw the 11000 MongoDB dupliocate error when needed
      if (err.code === 11000) {
        return res.status(CONFLICT_ERROR).send({ message: "Duplicate email" });
      }
      if (err.name === "CastError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      }
      if (err.name === "ValidationError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      }
      // if no errors match, return a response with status code 500
      return res
        .status(HTTP_INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (!email || !password) {
        return res.status(HTTP_BAD_REQUEST).send({ message: "Invalid data" });
      }

      return res
        .status(AUTHORIZATION_ERROR)
        .send({ message: "Authorization error" });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      }
      if (err.name === "ValidationError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(HTTP_NOT_FOUND).send({ message: err.message });
      }
      // if no errors match, return a response with status code 500
      return res
        .status(HTTP_INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

const updateProfile = (res, req) => {
  const userId = req.user._id;
  const { name, avatar } = req.params;
  User.findByIdAndUpdate(userId, { name, avatar }, { runValidators: true })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(HTTP_NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(HTTP_INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
