import { createConnection } from 'typeorm';

import { databaseConfig } from '../Configs/Database';

export const initializeConnection = async (): Promise<void> => {
  try {
    await createConnection(databaseConfig[process.env.NODE_ENV]);
  } catch (e) {
    throw new Error(e);
  }

  console.info('Mysql connection established!');
};
