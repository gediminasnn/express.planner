import './Utils/Bootstrap';

import Bootstrap from './Bootstrap';
import Example from './Controllers/Example';

const app = new Bootstrap([new Example()]);

(async () => {
  try {
    await app.initializeConnection();
    app.listen();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
