const mongoose = require("mongoose");
const validator = require("validator");
const user = require("./user");

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "You must enter a minimum of 2 characters"],
    maxLength: [30, "You must enter a maximum of 30 characters"],
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  likes: [
    {
      type: [mongoose.Types.ObjectId],
      ref: "User",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("clothingItems", clothingItem);
