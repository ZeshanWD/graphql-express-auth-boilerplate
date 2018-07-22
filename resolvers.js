import _m from './src/models/_m';
const User = _m('user');

export default {
  Query: {
    allUsers: (parent, args, context) => User.find({})
  },
  Mutation: {
    createUser: (parent, args, context) => {
      return User.create({
        email: args.email,
        username: args.username
      });
    }
  }
};
