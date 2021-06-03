import Bootstrap from './Bootstrap';
import User from './Controllers/User';

const app = new Bootstrap([new User()]);

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
