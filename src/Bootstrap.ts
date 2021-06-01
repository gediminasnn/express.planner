import express from 'express';
import { createConnection } from 'typeorm';

import databaseConfig from './Config/Database';
import { validateEnv, initLogger } from './Utils/Bootstrap';

import IBootstrap from './Types/Bootstrap';
import Controller from './Types/Controller';

export default class Bootstrap implements IBootstrap {
  public app: express.Application;

  private port = process.env.API_PORT || 1338;

  private controllers: Controller[];

  private databaseConfig = databaseConfig[process.env.NODE_ENV];

  constructor(controllers: Controller[]) {
    this.app = express();
    this.controllers = controllers;

    this.config();
    this.mount();
  }

  private config(): void {
    validateEnv();

    initLogger();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private mount(): void {
    this.app.get('/', (_, res: express.Response) => res.send('Hello World!'));

    this.controllers.forEach((controller: Controller) => this.app.use(controller.router));
  }

  async initializeConnection() {
    try {
      await createConnection(this.databaseConfig);
    } catch (e) {
      throw new Error(e);
    }

    console.info('Mysql connection established!');
  }

  listen(): void {
    this.app.listen(this.port, () => {
      return console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}
