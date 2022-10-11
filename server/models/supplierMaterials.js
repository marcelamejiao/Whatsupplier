const { Schema, Types } = require('mongoose');

const supplierMaterialsSchema = new Schema(
  {
    material: {
      type: Schema.Types.ObjectId,
      ref: 'material',
    },
    cost: {
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

module.exports = supplierMaterialsSchema;
