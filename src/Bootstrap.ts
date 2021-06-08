import express from 'express';

import { validateEnv, initLogger } from './Utils/Bootstrap';

import IBootstrap from './Types/Bootstrap';
import Controller from './Types/Controller';

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
    validateEnv();
    initLogger();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private mount(): void {
    this.app.get('/', (_, { send }: express.Response) => send('Hello World!'));

    this.controllers.forEach(({ router }: Controller) => this.app.use(router));
  }

  listen(): void {
    this.app.listen(this.port, () => {
      return console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}
