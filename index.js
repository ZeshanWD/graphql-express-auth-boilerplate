import express from 'express';
import bodyParser from 'body-parser';
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

// Graphical Interface
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);

// GraphQL server
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.listen(constants.PORT, err => {
  if (err) {
    console.log('Error happened...', err);
  } else {
    console.log(`App listening to PORT ${constants.PORT}`);
  }
});
