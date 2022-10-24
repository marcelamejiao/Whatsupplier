const { AuthenticationError } = require('apollo-server-express');
const { User, Supplier, Material } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51Lw2jTCa4vlrvSc1NZyMtZtAIkJURYOOptJ4n1bdWYsSgAsJZhPNC3zf1u1zBkQGaTQMaWxAsIRYZAm7iJgYjN8U0025RwoMZq');

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
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer ?? 'http://localhost:3001').origin;
      const line_items = [];

      // Price ID of the product created in Stripe: https://dashboard.stripe.com/test/products
      const priceId = 'price_1Lw2n9Ca4vlrvSc1AZ0cWmfb';

      line_items.push({
        price: priceId,
        quantity: 1
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
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
    },
    placeOrder: async (parent, { units, materialId, supplierId }, context) => {
      if (context.user) {
        // Find the user with it's userMaterials
        const user = await User.findOne({ _id: context.user._id }).populate('userMaterials.material');
        const userMaterials = user.userMaterials;

        // Find the userMaterial specified by materialId
        const userMaterial = userMaterials.find((userMaterial) => {
          return userMaterial.material._id == materialId;
        });

        // TODO: Future development, send an email to the supplier with the order details

        // Increment the stock my the units
        const stock = userMaterial.stock + units;
        const safetyStock = userMaterial.safetyStock;
        const anticipatedDemand = userMaterial.anticipatedDemand;

        // Remove the material from the user's userMaterials
        await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { userMaterials: { material: materialId } },
          },
          { new: true, runValidators: true }
        );
  
        // Re-Add the material to the user's userMaterials but with the new stock
        await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { userMaterials: { material: materialId, stock, safetyStock, anticipatedDemand } }
          },
          { new: true, runValidators: true }
        )
          .populate({ path: 'userMaterials.material', select: '-__v' });

        return await User.findOne({ _id: context.user._id }).populate('userMaterials.material');
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    upgradeAccount: async (parent, { sessionId }, context) => {
      if (context.user) {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session?.payment_status === 'paid') {
          // Upgrade the user from Trial to Premium
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              isTrial: false,
            },
            {
              new: true,
              runValidators: true,
            }
          )
            .populate('userMaterials.material');
  
          return user;
        }
  
        return User.findOne({ _id: context.user._id }).populate('userMaterials.material');
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
