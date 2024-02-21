const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name field is required!"],
      index: true,
      minLength: [2, "Must be a minimum of 2 characters"],
      maxLength: [30, "Must be a maximum of 30 characters"],
    },
    avatar: {
      type: String,
      required: [true, "The avatar field is required!"],
      validate: {
        validator: (v) => validator.isURL(v),
        message: "You must enter a valid URL",
      },
    },
    email: {
      type: String,
      required: [true, "The email field is required!"],
      index: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "You must enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: [8, "Must be a minimum of 8 characters"],
      maxlength: [80, "Must be a maximum of 80 characters"],
    },
  },
  { timestamps: true },
);
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
