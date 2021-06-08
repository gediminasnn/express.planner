import { initializeConnection } from './Utils/app';
import Bootstrap from './Bootstrap';
import UserController from './Modules/User/User.controller';

(async () => {
  try {
    await initializeConnection();

    const app = new Bootstrap([new UserController()]);

    app.listen();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
