import { Request, Response, Router } from 'express';
import { Repository, getRepository } from 'typeorm';

import User from '../Entities/User';
import UserService from '../Services/User';

import Controller from '../Types/Controller';
import { Order, PaginationVariables } from '../Types/User';

export default class UserController implements Controller {
  path: Controller['path'] = '/users';

  router: Controller['router'] = Router();

  userRepository: Repository<User> = getRepository(User);

  // TODO: Use interface
  userService: UserService;

  constructor() {
    this.initRoutes();
    this.userService = new UserService();
  }

  public async create({ body: { email, username, password } }: Request, res: Response) {
    try {
      const user = await this.userService.createUser(email, username, password);
      return res.status(200).json(user);
    } catch (e) {
      console.error(e);
      return res.status(500).send('User creation failed :(');
    }
  }

  public async findMany(
    { query: { order = Order.DESC, start = 0, limit = 10 } }: Request<any, any, any, PaginationVariables>,
    res: Response,
  ) {
    try {
      const users = await this.userRepository.find({ order: { createdAt: order }, take: limit, skip: start });

      return res.status(200).json(users);
    } catch (e) {
      console.error(e);
      return res.status(500).send('Users search failed :(');
    }
  }

  public async findOne({ params: { id } }: Request, res: Response) {
    try {
      const user = await this.userRepository.findOneOrFail(id);

      return res.status(200).json(user);
    } catch (e) {
      console.error(e);
      return res.status(500).send('User search failed :(');
    }
  }

  public async update({ params: { id }, body: { email, username, password } }: Request, res: Response) {
    try {
      const user = await this.userRepository.findOneOrFail(id);

      await this.userRepository.save({ ...user, email, username, password });

      return res.status(200).json(user);
    } catch (e) {
      console.error(e);
      return res.status(500).send('Updateing user unsuccessful :(');
    }
  }

  public async delete({ params: { id } }: Request, res: Response) {
    try {
      await this.userRepository.softDelete(id);

      return res.status(200).send(`User ${id} deletion successful`);
    } catch (e) {
      console.error(e);
      return res.status(500).send('Deleting user unsuccessful :(');
    }
  }

  initRoutes() {
    this.router.post(`${this.path}`, this.create.bind(this));
    this.router.get(`${this.path}`, this.findMany.bind(this));
    this.router.get(`${this.path}/:id`, this.findOne.bind(this));
    this.router.put(`${this.path}/:id`, this.update.bind(this));
    this.router.delete(`${this.path}/:id`, this.delete.bind(this));
  }
}
