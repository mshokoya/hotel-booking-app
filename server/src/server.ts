import express, {Application} from 'express';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs} from './graphql/typeDefs';
import {resolvers} from './graphql/resolvers';
import {connectDatabase} from './database';

const port = process.env.PORT;

const mount = async (app: Application) => {
  const db = await connectDatabase()

  const qraphQlServer = new ApolloServer({typeDefs, resolvers, context: () => ({db})});
  qraphQlServer.applyMiddleware({app, path: '/api'});

  app.listen(port, () => {
    console.log(`[app] http://localhost:${port}`);
  });

}

mount(express())