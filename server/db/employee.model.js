// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  present: Boolean,
  favouriteColor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "colors"
  },
  equipment : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "equipment"
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
