import path from 'path';

const recurringValues = {
  type: 'mysql',
  entities: [path.join(__dirname, '../Entities/*.ts')],
  cli: { entitiesDir: path.join(__dirname, '../Entities') },
  synchronize: true,
};

export const databaseConfig = {
  production: {
    ...recurringValues,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  development: {
    ...recurringValues,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  testing: {
    ...recurringValues,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
};
