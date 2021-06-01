import 'dotenv/config';
import { cleanEnv, port, str } from 'envalid';
import log4js from 'log4js';

const validateEnv = () =>
  cleanEnv(process.env, {
    API_PORT: port(),

    MYSQL_USERNAME: str(),
    MYSQL_PASSWORD: str(),
    MYSQL_DATABASE: str(),
    MYSQL_HOST: str(),
    MYSQL_PORT: port(),

    NODE_ENV: str(),
  });

const initLogger = () => {
  const logger: log4js.Logger = log4js.getLogger();
  logger.level = 'debug';

  console.log = (args) => logger.info(args);
  console.info = console.log;
  console.warn = (args) => logger.warn(args);
  console.error = (args) => logger.error(args);
  console.debug = (args) => logger.debug(args);
};

export { validateEnv, initLogger };
