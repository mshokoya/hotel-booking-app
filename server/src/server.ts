import express, {Application} from 'express';
import cookieParser from 'cookie-parser';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs} from './graphql/typeDefs';
import {resolvers} from './graphql/resolvers';
import {connectDatabase} from './database';


const port = process.env.PORT;

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(cookieParser(process.env.SECRET));

  const qraphQlServer = new ApolloServer({typeDefs, resolvers, context: ({req, res}) => ({db, req, res})});
  qraphQlServer.applyMiddleware({app, path: '/api'});

  app.listen(port, () => {
    console.log(`[app] http://localhost:${port}!`);
  });

}

mount(express())