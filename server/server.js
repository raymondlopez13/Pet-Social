const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');
const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const { graphqlUploadExpress } = require('graphql-upload');

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: authMiddleware 
  });
  await server.start();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  // Serve up static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  app.use("/images", express.static(path.join(__dirname, "images")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer(typeDefs, resolvers);




