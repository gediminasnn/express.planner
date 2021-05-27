import express from 'express';
import log4js from 'log4js';

export default class Bootstrap {
  public app: express.Application;

  private port = process.env.API_PORT || 1338;

  constructor() {
    this.app = express();

    this.config();
    this.mount();
  }

  private config(): void {
    const logger: log4js.Logger = log4js.getLogger();
    logger.level = 'debug';

    console.log = (args) => logger.info(args);
    console.info = console.log;
    console.warn = (args) => logger.warn(args);
    console.error = (args) => logger.error(args);
    console.debug = (args) => logger.debug(args);

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private mount(): void {
    this.app.get('/', (_, res: express.Response) => res.send('Hello World!'));
  }

  listen(): void {
    this.app.listen(this.port, () => {
      return console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}
