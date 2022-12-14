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
    safetyStock: {
      type: Number,
      required: true,
    },
    anticipatedDemand: {
      type: Number,
      required: true,
    },
  },
);

module.exports = userMaterialsSchema;
