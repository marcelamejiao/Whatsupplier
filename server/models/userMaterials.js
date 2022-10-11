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
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = userMaterialsSchema;
