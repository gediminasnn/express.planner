import Bootstrap from './Bootstrap';
import UserController from './Controllers/User';
import { initializeConnection } from './Utils/app';

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
