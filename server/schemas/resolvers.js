const { AuthenticationError } = require('apollo-server-express');
const { User, Supplier, Material } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    suppliers: async () => {
      return Supplier.find();
    },
    supplier: async (parent, { _id }) => {
      return Supplier.findOne({ _id: _id }).populate('supplierMaterials.material');
    },
    materials: async () => {
      return Material.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('userMaterials.material');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, companyName, companyDetails }) => {
      const user = await User.create({ username, email, password, companyName, companyDetails });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addSupplier: async (parent, { name, email, address, phone }, context) => {
      if (context.user) {
        const newSupplier = await Supplier.create({
          name,
          email,
          address,
          phone,
          user: context.user._id,
        });
        return newSupplier;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateSupplier: async (parent, { _id, name, email, address, phone }, context) => {
      if (context.user) {
        return await Supplier.findOneAndUpdate(
          { _id: _id },
          {
            name,
            email,
            address,
            phone,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteSupplier: async (parent, { _id }, context) => {
      if (context.user) {
        return await Supplier.findOneAndDelete({ _id});
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateUserMaterial: async (parent, { _id, materialId, stock, safetyStock, anticipatedDemand } , context) => {
      await User.findOneAndUpdate(
        { _id: _id },
        {
          $pull: { userMaterials: { material: materialId } },
        },
        { new: true, runValidators: true }
      );

      return await User.findOneAndUpdate(
        { _id: _id },
        {
          $addToSet: { userMaterials: { material: materialId, stock, safetyStock, anticipatedDemand } }
        },
        { new: true, runValidators: true }
      )
        .populate({ path: 'userMaterials.material', select: '-__v' });
    },

    updateSupplierMaterial: async (parent, { _id, materialId, cost, leadTime }, context) => {
      await Supplier.findOneAndUpdate(
        { _id: _id },
        {
          $pull: { supplierMaterials: { material: materialId } },
        },
        { new: true, runValidators: true }
      );

      return await Supplier.findOneAndUpdate(
        { _id: _id },
        {
          $addToSet: { supplierMaterials: { material: materialId, cost, leadTime } }
        },
        { new: true, runValidators: true }
      )
        .populate({ path: 'supplierMaterials.material', select: '-__v' });
    }
  },
};

module.exports = resolvers;
