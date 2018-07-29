import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import _m from './src/models/_m';
const User = _m('user');

export default {
  Query: {
    allUsers: (parent, args, { user }) => {
      console.log(user);
      if (user) {
        // logged in
      } else {
        // not logged in
      }
      return User.find({});
    },
    getCurrentUser: (_, __, { user }) => {
      if (user) {
        // user is logged in
        return User.findById(user._id);
      }
      // user is not logged in
      return null;
    }
  },
  Mutation: {
    register: async (parent, args, context) => {
      if (!args.email) throw new Error('SIGNUP__EMAIL_IS_REQUIRED');

      const user = await User.find({ email: args.email });
      if (user) throw new Error('SIGNUP__EMAIL_ALREADY_EXISTS');

      // vamos a hashear la contraseña, para guardarla en la base de datos.
      args.password = await bcrypt.hash(args.password, 12);
      return User.create(args);
    },
    login: async (parent, { email, password }, { SECRET }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('No use with that email');
      }

      // password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Incorrect Password');
      }

      // Han pasado la prueba y ahora solo tenemos que crear el Token y devolverlo.
      const token = jwt.sign(
        {
          user: _.pick(user, ['_id', 'username'])
        },
        SECRET,
        {
          expiresIn: '4h'
        }
      );

      return token;
    }
  }
};
