const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
// Apollo server
const { ApolloServer } = require('apollo-server-express');
// Deftype & Resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
// db
const db = require('./config/connection');
// express
const app = express();
const PORT = process.env.PORT || 3001;



// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
