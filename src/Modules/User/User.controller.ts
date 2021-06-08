import { Request, Response, Router } from 'express';
import { Repository, getRepository } from 'typeorm';

import UserEntity from './User.entity';
import UserService from './User.service';

import Controller from '../../Types/Controller';
import { Order, PaginationVariables, UserService as IUserService } from './types';

export default class UserController implements Controller {
  path: Controller['path'] = '/users';

  router: Controller['router'] = Router();

  userRepository: Repository<UserEntity> = getRepository(UserEntity);

  userService: IUserService;

  constructor() {
    this.initRoutes();
    this.userService = new UserService();
  }

  public async postUser({ body: { email, username, password } }: Request, res: Response) {
    try {
      const user = await this.userService.postUser(email, username, password);

      return res.status(200).json(user);
    } catch (e) {
      console.error(e);
      return res.status(500).send('User creation failed :(');
    }
  }

  public async getUsers(
    { query: { order = Order.DESC, start = 0, limit = 10 } }: Request<any, any, any, PaginationVariables>,
    res: Response,
  ) {
    try {
      const users = await this.userService.getUsers(order, start, limit);

      return res.status(200).json(users);
    } catch (e) {
      console.error(e);
      return res.status(500).send('Users search failed :(');
    }
  }

  public async getUser({ params: { id } }: Request, res: Response) {
    try {
      const user = await this.userService.getUser(id);

      return res.status(200).json(user);
    } catch (e) {
      console.error(e);
      return res.status(500).send('User search failed :(');
    }
  }

  public async updateUser({ params: { id }, body: { email, username, password } }: Request, res: Response) {
    try {
      const user = await this.userService.updateUser(id, email, username, password);

      return res.status(200).json(user);
    } catch (e) {
      console.error(e);
      return res.status(500).send('Updateing user unsuccessful :(');
    }
  }

  public async deleteUser({ params: { id } }: Request, res: Response) {
    try {
      await this.userService.deleteUser(id);

      return res.status(200).send(`User ${id} deletion successful`);
    } catch (e) {
      console.error(e);
      return res.status(500).send('Deleting user unsuccessful :(');
    }
  }

  initRoutes() {
    this.router.post(`${this.path}`, this.postUser.bind(this));
    this.router.get(`${this.path}`, this.getUsers.bind(this));
    this.router.get(`${this.path}/:id`, this.getUser.bind(this));
    this.router.put(`${this.path}/:id`, this.updateUser.bind(this));
    this.router.delete(`${this.path}/:id`, this.deleteUser.bind(this));
  }
}
