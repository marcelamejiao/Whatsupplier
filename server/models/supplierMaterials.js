const { Schema } = require('mongoose');

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
    leadTime: {
      type: Number,
      required: true,
    },
  },
);

module.exports = supplierMaterialsSchema;
