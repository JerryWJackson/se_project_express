const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res
        .status(500)
        .send({ message: "Error creating item with createItem", e });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error reading items with getItems", e });
    });
};

// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { imageURL } = req.body;

//   ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
//     .orFail()
//     .then((item) => res.status(200).send({ data: item }))
//     .catch((e) => {
//       res
//         .status(500)
//         .send({ message: "Error updating item with updateItem", e });
//     });
// };

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) => {
      res
        .status(500)
        .send({ message: "Error deleting item with deleteItem", e });
    });
};

const likeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

};

module.exports.likeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
  { new: true },
)
//...

module.exports.dislikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)
module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id);
};

module.exports = {
  createItem,
  getItems,
  // updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
