import { Router } from 'express';

interface Controller {
  path: string;
  router: Router;

  initRepository: () => void;
  initRoutes: () => void;
}

export default Controller;
