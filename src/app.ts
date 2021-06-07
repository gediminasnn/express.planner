import Bootstrap from './Bootstrap';
import UserController from './Controllers/User';
import { initializeConnection } from './Utils/app';

(async () => {
  try {
    await initializeConnection();

    app.mountRepositories();
    app.listen();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
