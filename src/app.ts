import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import db from './models';
import schema from './graphql/schema';
import pusher from './library/Pusher';
import * as cors from 'cors';
import { extractJwtMiddleware } from './middlewares/extract-jwt-middleware';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
  }

  private middleware(): void {
    this.express.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Enconding'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
      }),
    );

    this.express.use(
      '/graphql',
      extractJwtMiddleware(),
      (req, res, next) => {
        req['context'].db = db;
        req['context'].pusher = pusher.pusherTriggers;
        next();
      },
      graphqlHTTP(req => ({
        schema: schema,
        graphiql: process.env.NODE_ENV === 'development',
        context: req['context'],
      })),
    );
  }
}

export default new App().express;
