import 'reflect-metadata';

import { container } from 'tsyringe';

import * as adapters from './adapters';
import { UserHandler } from './domain/user/handlers/user';
import { User } from './domain/user/models/user';
import { UserQuerier } from './domain/user/queries/user';

export interface Modules {
  readonly handlers: {
    userHandler: UserHandler;
  };
  readonly queries: {
    userQuerier: UserQuerier;
  };
};

async function createModule(): Promise<Modules> {
  adapters.typeorm.config();
  await adapters.typeorm.connect();

  const userRepo = adapters.typeorm.getRepository(User);

  const userQuerier = new UserQuerier(userRepo);

  container.register('IUserQuerier', { useValue: userQuerier });

  container.register<UserHandler>(UserHandler, {
    useClass: UserHandler,
  });

  const userHandler = new UserHandler(userRepo);

  return {
    handlers: {
      userHandler,
    },
    queries: {
      userQuerier,
    },
  }
};

export { createModule };
