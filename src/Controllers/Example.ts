import { Request, Response, Router } from 'express';

import typeorm from 'typeorm';

import ExampleModel from '../Models/Example';

import Controller from '../Types/Controller';

export default class Example implements Controller {
  path: Controller['path'] = '/';
  router: Controller['router'] = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get('/hello', (req: Request, res: Response) => res.send('Hello World from controller!'));
  }
}
