import { Router } from 'express';

interface Controller {
  path: string;
  router: Router;

  mountRepository: () => void;
  initRoutes: () => void;
}

export default Controller;
