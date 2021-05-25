import "dotenv/config";

import { cleanEnv, num } from "envalid";

const env = cleanEnv(process.env, {
  API_PORT: num(),
});
