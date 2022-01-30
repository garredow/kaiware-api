import { makeExecutableSchema } from '@graphql-tools/schema';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { resolvers as scalarResolvers, typeDefs as scalarTypeDefs } from 'graphql-scalars';
import mercurius from 'mercurius';
import { LoggerOptions } from 'pino';
import { Database } from './database/db';
import { resolvers } from './graphql/resolvers';
import { App } from './graphql/types/App';
import { Category } from './graphql/types/Category';
import { Person } from './graphql/types/Person';
import { Query } from './graphql/types/Query';
import { Release } from './graphql/types/Release';
import { User } from './graphql/types/User';
import { config } from './lib/config';
import { Data } from './services/data';

const db = new Database();
const dataClient = new Data(db);

const buildContext = async (req: FastifyRequest, reply: FastifyReply) => {
  // const res = await verifyToken(req.headers.authorization).catch(() => {});

  // const userId = res?.sub;
  // if (!userId) {
  //   throw new mercurius.ErrorWithProps('There was an issue with your token', undefined, 401);
  // }

  return {
    // userId,
    dataClient,
  };
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;
declare module 'mercurius' {
  interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {}
}

const logger: LoggerOptions = {
  enabled: config.logger.enabled,
  name: 'kaiware-api',
  level: config.logger.level,
  formatters: {
    level: (label: string) => ({ level: label }),
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
};

export function configureServer() {
  const fastify = Fastify({
    logger: logger as any,
  });

  fastify.register(require('fastify-cors'));

  fastify.register(mercurius, {
    schema: makeExecutableSchema({
      typeDefs: [...scalarTypeDefs, Query, App, Category, Person, Release, User],
      resolvers: {
        ...scalarResolvers,
        ...resolvers,
      } as any,
    }),
    context: buildContext,
    graphiql: true,
  });

  return fastify;
}
