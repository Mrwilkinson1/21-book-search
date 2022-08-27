
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        User: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate("savedBooks");
            }
            throw new AuthenticationError('User not logged in!');
        },
    },
    Mutation: {
        addUser: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password });
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect Password');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Sorry please try again');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('Sorry please try again')
        },
        deleteBook: async (parent, { args }, context) => {
            if (context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );
                return updateUser;
            }
            throw new AuthenticationError('Didnt say the magic word');
        },
    },
};
module.exports = resolvers;







