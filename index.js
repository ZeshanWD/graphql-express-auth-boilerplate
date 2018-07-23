import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import constants from './src/config/constants';
// Mongo connection
import './src/config/db';

import typeDefs from './schema';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

// Middleware para autenticar el token
const addUser = async req => {
  const token = req.headers.authorization;
  try {
    // el metodo verify nos devuelve el payload.
    const { user } = await jwt.verify(token, constants.SECRET);
    req.user = user;
  } catch (err) {
    console.log(err);
  }
  req.next();
};

app.use(addUser);

app.use(cors());

// Graphical Interface
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);

// GraphQL server
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user,
      SECRET: constants.SECRET
    }
  }))
);

app.listen(constants.PORT, err => {
  if (err) {
    console.log('Error happened...', err);
  } else {
    console.log(`App listening to PORT ${constants.PORT}`);
  }
});
