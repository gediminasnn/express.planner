import { Request, Response, Router } from 'express';

import AuthService from './Auth.service';

import Controller from '../../Types/Controller';
import { AuthService as IAuthService, AuthValues } from './types';

export default class AuthController implements Controller {
  path: Controller['path'] = '/';

  router: Controller['router'] = Router();

  authService: IAuthService;

  constructor() {
    this.initRoutes();
    this.authService = new AuthService();
  }

  public async authUser({ body: { email, password } }: Request, res: Response) {
    try {
      const { isNewUser, encryptedJwt }: AuthValues = await this.authService.authUser(email, password);

      return res.status(isNewUser ? 201 : 200).send(encryptedJwt);
    } catch (e) {
      console.error(e);
      return res.status(500).send('User auth failed :(');
    }
  }

  public async afterAuth({ headers: { authorization } }: Request, res: Response) {
    try {
      const user = await this.authService.afterAuth(authorization);

      return res.status(200).send(user);
    } catch (e) {
      console.error(e);
      return res.status(401).send('After auth failed! :(');
    }
  }

  initRoutes() {
    this.router.post(`${this.path}auth`, this.authUser.bind(this));
    this.router.get(`${this.path}afterAuth`, this.afterAuth.bind(this));
  }
}
