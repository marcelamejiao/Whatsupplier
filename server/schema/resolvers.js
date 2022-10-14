const { AuthenticationError } = require('apollo-server-express');
const { User, Supplier } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        suppliers: async () => {
            return Supplier.find();
        },
        supplier: async (parent, { supplierId }) => {
            return Supplier.findOne({ _id: supplierId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
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
                const newSupplier = Supplier.create({
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
        updateSupplier: async (parent, args, context) => {

        },
        deleteSupplier: async (parent, { _id }, context) => {

        },
        updateUserMaterial: async (parent, args, context) => {

        },
        updateSupplierMaterial: async (parent, args, context) => {

        },
    },
};

module.exports = resolvers;
