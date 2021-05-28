import 'dotenv/config';
import { cleanEnv, port, str } from 'envalid';

const env = cleanEnv(process.env, {
  API_PORT: port(),
  MYSQL_ROOT_PASSWORD: str(),
  MYSQL_DATABASE: str(),
  MYSQL_PORT: port(),
});
