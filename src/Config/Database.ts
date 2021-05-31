import path from 'path';

export default {
  dev: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [path.join(__dirname, 'src/Entities/*.ts')],
    synchronize: true,
  },
};
