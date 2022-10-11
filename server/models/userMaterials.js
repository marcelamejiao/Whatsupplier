const { Schema, Types } = require('mongoose');

const userMaterialsSchema = new Schema(
  {
    materialtId: {
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
