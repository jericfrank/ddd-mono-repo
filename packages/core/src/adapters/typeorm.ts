import { DataSource, Repository, EntityTarget, ObjectLiteral } from 'typeorm';

import * as userModels from '../domain/user/models';

let dataSource: DataSource;

export function config(): void {
  dataSource = new DataSource({
    type: 'postgres',
    replication: {
      master: {
        host: process.env.DB_MASTER_HOST || 'db-master',
        port: Number(process.env.DB_MASTER_PORT) || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_MASTER_NAME || 'appdb_master',
      },
      slaves: [
        {
          host: process.env.DB_SLAVE_HOST || 'db-slave',
          port: Number(process.env.DB_SLAVE_PORT) || 5432,
          username: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || 'password',
          database: process.env.DB_SLAVE_NAME || 'appdb_slave',
        },
      ],
    },
    synchronize: true,
    logging: ['query', 'error'],
    entities: [
      userModels.User,
    ],
  });
}

export async function connect(): Promise<void> {
  if (!dataSource) {
    throw new Error('TypeORM connection not created. Call createTypeORMConnection() first.');
  }

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
}

export function getRepository<Entity extends ObjectLiteral>(
  entity: EntityTarget<Entity>
): Repository<Entity> {
  if (!dataSource?.isInitialized) {
    throw new Error('TypeORM not initialized.');
  }

  return dataSource.getRepository(entity);
}

export async function disconnect(): Promise<void> {
  if (dataSource?.isInitialized) {
    await dataSource.destroy();
  }
}
