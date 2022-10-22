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
    cheapestSupplier: async (parent, { materialId }) => {
      // Get the suppliers that sell the material
      let suppliers = await Supplier.find({
        supplierMaterials: {
          $elemMatch: {
            material: materialId
          }
        }
      })
      .populate('supplierMaterials.material');

      // Remove the Materials from the supplierMaterials array that are not relevant to the current material
      suppliers = suppliers.map((supplier) => {
        supplier.supplierMaterials = supplier.supplierMaterials.filter(
          (supplierMaterial) => supplierMaterial.material._id == materialId
        );
        return supplier;
      });

      // Sort from the cheapest to the most expensive
      suppliers = suppliers.sort(
        (supplierA, supplierB) => supplierA.supplierMaterials[0].cost - supplierB.supplierMaterials[0].cost 
      );

      // Return the cheapest to the front-end
      return suppliers[0];
    },
    reorderPoint: async (parent, { supplierId, materialId }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate('userMaterials.material');
        const userMaterials = user.userMaterials;
        const userMaterial = userMaterials.find((userMaterial) => {
          return userMaterial.material._id == materialId
        });

        const supplier = await Supplier.findOne({ _id: supplierId }).populate('supplierMaterials.material');
        const supplierMaterials = supplier.supplierMaterials;
        const supplierMaterial = supplierMaterials.find((supplierMaterial) => {
          return supplierMaterial.material._id == materialId;
        });

        const safetyStock = userMaterial.safetyStock;
        const anticipatedDemand = userMaterial.anticipatedDemand;
        const leadTime = supplierMaterial.leadTime;

        // Re-Order Point = Anticipated Demand x Lead Time + Safety Stock
        const reorderPoint = (anticipatedDemand * leadTime) + safetyStock;
        return reorderPoint;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
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

    updateUserMaterial: async (parent, {_id, stock, safetyStock, anticipatedDemand } , context) => {
      await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $pull: { userMaterials: { material: _id } },
        },
        { new: true, runValidators: true }
      );

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: { userMaterials: { material: _id, stock, safetyStock, anticipatedDemand } }
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
