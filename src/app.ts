import Bootstrap from './Bootstrap';
import UserController from './Controllers/User';

const app = new Bootstrap([new UserController()]);

(async () => {
  try {
    await app.initializeConnection();

    app.mountRepositories();

    app.listen();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
