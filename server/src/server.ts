import express, {Application} from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs} from './graphql/typeDefs';
import {resolvers} from './graphql/resolvers';
import {connectDatabase} from './database';
import compression from 'compression';


const port = process.env.PORT;

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(bodyParser.json({ limit: "2mb" }));
  app.use(cookieParser(process.env.SECRET));
  app.use(compression());
  
  app.use(express.static(`${__dirname}/client`));
  app.get("/*", (_req, res) => res.sendFile(`${__dirname}/client/index.html`));

  const qraphQlServer = new ApolloServer({typeDefs, resolvers, context: ({req, res}) => ({db, req, res})});
  qraphQlServer.applyMiddleware({app, path: '/api'});

  app.listen(port, () => {
    console.log(`[app] http://localhost:${port}!`);
  });

}

mount(express())