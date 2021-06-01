import path from 'path';

const recurringValues = {
  type: 'mysql',
  entities: [path.join(__dirname, 'src/Entities/*.ts')],
  cli: { entitiesDir: path.join(__dirname, 'src/Entities') },
  synchronize: true,
};

const ormConfig = {
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

export = ormConfig[process.env.NODE_ENV];
