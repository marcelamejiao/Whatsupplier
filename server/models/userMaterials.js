const { Schema, Types } = require('mongoose');

const userMaterialsSchema = new Schema(
  {
    material: {
      type: Schema.Types.ObjectId,
      ref: 'material',
    },
    stock: {
      type: Number,
      required: true,
    },

  },
);

module.exports = userMaterialsSchema;
