import { Router } from 'express';

interface Controller {
  path: string;
  router: Router;

  initRoutes: () => void;
}

export default Controller;
