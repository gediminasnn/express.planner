import 'dotenv/config';
import { cleanEnv, port, str, bool } from 'envalid';

const env = cleanEnv(process.env, {
  API_PORT: port(),

  MYSQL_ROOT_USERNAME: str(),
  MYSQL_ROOT_PASSWORD: str(),
  MYSQL_DATABASE: str(),
  MYSQL_PORT: port(),

  TYPEORM_CONN_HOST: str(),
  TYPEORM_CONN_PORT: port(),
  TYPEORM_CONN_SYNC: bool(),
});
