import "dotenv/config";

import { cleanEnv, port } from "envalid";

const env = cleanEnv(process.env, {
  API_PORT: port(),
});
