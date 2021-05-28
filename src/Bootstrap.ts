import express from 'express';
import log4js from 'log4js';
import { createConnection } from 'typeorm';

import Controller from './Types/Controller';

import IBootstrap from './Types/Bootstrap';

export default class Bootstrap implements IBootstrap {
  public app: express.Application;

  private port = process.env.API_PORT || 1338;

  private controllers: Controller[];

  constructor(controllers: Controller[]) {
    this.app = express();
    this.controllers = controllers;

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

    this.controllers.forEach((controller: Controller) => this.app.use(controller.router));
  }

  initializeConnection = async () => {
    try {
      await createConnection({
        type: 'mysql',
        host: 'database',
        port: 3306,
        username: 'root',
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      });
    } catch (e) {
      throw new Error(e);
    }

    console.info('Mysql connection established!');
  };

  listen(): void {
    this.app.listen(this.port, () => {
      return console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}
