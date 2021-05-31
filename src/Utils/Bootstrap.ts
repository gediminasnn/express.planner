import 'dotenv/config';
import { cleanEnv, port, str } from 'envalid';

const env = cleanEnv(process.env, {
  API_PORT: port(),

  MYSQL_USERNAME: str(),
  MYSQL_PASSWORD: str(),
  MYSQL_DATABASE: str(),
  MYSQL_HOST: str(),
  MYSQL_PORT: port(),

  NODE_ENV: str(),
});
