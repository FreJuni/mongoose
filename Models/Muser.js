const { Schema, model } = require("mongoose");

const userShema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    minLength: 3,
    maxLength: 9,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
    minLength: 5,
  },
});

module.exports = model("User", userShema);
