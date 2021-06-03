import express from 'express';
import { createConnection } from 'typeorm';

import { validateEnv, initLogger } from './Utils/Bootstrap';
import { databaseConfig } from './Configs/Database';

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

  private async config(): Promise<void> {
    validateEnv();
    initLogger();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private mount(): void {
    this.app.get('/', (_, res: express.Response) => res.send('Hello World!'));

    this.controllers.forEach((controller: Controller) => {
      this.app.use(controller.router);
    });
  }

  public async initializeConnection(): Promise<void> {
    try {
      await createConnection(this.databaseConfig[process.env.NODE_ENV]);
    } catch (e) {
      throw new Error(e);
    }

    console.info('Mysql connection established!');
  }

  public mountRepositories(): void {
    this.controllers.forEach((controller: Controller) => {
      controller.initRepository();
    });
  }

  listen(): void {
    this.app.listen(this.port, () => {
      return console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}
