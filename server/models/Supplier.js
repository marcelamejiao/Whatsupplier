const { Schema, model } = require('mongoose');
const supplierMaterialsSchema = require('./supplierMaterials');

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    supplierMaterials: [supplierMaterialsSchema]
  },
);

const Supplier = model('supplier', supplierSchema);

module.exports = Supplier;
