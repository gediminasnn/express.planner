import path from 'path';

const recValues = {
  type: 'mysql',
  entities: [path.join(__dirname, 'src/Entities/*.ts')],
  synchronize: true,
};

export default {
  production: {
    type: recValues.type,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: recValues.entities,
    synchronize: recValues.synchronize,
  },
  development: {
    type: recValues.type,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: recValues.entities,
    synchronize: recValues.synchronize,
  },
  testing: {
    type: recValues.type,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: recValues.entities,
    synchronize: recValues.synchronize,
  },
};
