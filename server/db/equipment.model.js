const mongoose = require('mongoose');

const { Schema } = mongoose;

const EquipmentSchema = new Schema(
    {
        name: String,
        type: String,
        amount: Number,
    },

);

module.exports = mongoose.model("equipment", EquipmentSchema);