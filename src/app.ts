import { initializeConnection } from './Utils/app';
import Bootstrap from './Bootstrap';
import UserController from './Modules/User/User.controller';
import AuthController from './Modules/Auth/Auth.controller';

(async () => {
  try {
    await initializeConnection();

    const app = new Bootstrap([new UserController(), new AuthController()]);

    app.listen();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
