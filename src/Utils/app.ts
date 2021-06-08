import { createConnection } from 'typeorm';

import { databaseConfig } from '../Configs/Database';

const { NODE_ENV } = process.env;

export const initializeConnection = async (): Promise<void> => {
  try {
    await createConnection(databaseConfig[NODE_ENV]);
  } catch (e) {
    throw new Error(e);
  }

  console.info('Mysql connection established!');
};
