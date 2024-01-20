const ClothingItem = require("../models/clothingItem");
const {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const payload = req.body;
  payload.owner = req.user._id;
  console.log(payload);

  ClothingItem.create(payload)
    .then((item) => {
      console.log(item);
      res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      } else if (err.name === "ValidationError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      } else if (err.name === "AssertionError") {
        return res.status(200).send({ message: "No item with that id." });
      } else {
        // if no errors match, return a response with status code 500
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: err.message });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(HTTP_NOT_FOUND).send({ message: err.message });
      } else {
        // if no errors match, return a response with status code 500
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: err.message });
      }
    });
};

const deleteItem = (req, res) => {
  console.log(req.params);
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({ message: "OK" }))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(HTTP_BAD_REQUEST).send({ message: err.message });
      } else if (err.name === "ReferenceError") {
        return res.status(HTTP_BAD_REQUEST).send();
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(HTTP_NOT_FOUND).send({ message: err.message });
      } else {
        // if no errors match, return a response with status code 500
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: err.message });
      }
    });
};

const likeItem = (req, res) => {
  console.log(req.params.itemId);
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send(item);
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
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(HTTP_NOT_FOUND).send({ message: err.message });
      } else {
        // if no errors match, return a response with status code 500
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: err.message });
      }
    });
};

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
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

module.exports.createItem = (req, res) => {
  console.log(req.user._id);
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
