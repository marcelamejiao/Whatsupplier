const { Schema, model } = require('mongoose');

const materialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
);


const Material = model('material', materialSchema);

module.exports = Material;
