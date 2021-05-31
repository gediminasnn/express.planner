import path from 'path';

export default {
  production: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [path.join(__dirname, 'src/Entities/*{.ts,.js}')],
    synchronize: true,
  },
  development: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [path.join(__dirname, 'src/Entities/*{.ts,.js}')],
    synchronize: true,
  },
};
