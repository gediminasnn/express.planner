import { Request, Response, Router } from 'express';
import { Repository, getRepository } from 'typeorm';

import User from '../Entities/User';

import Controller from '../Types/Controller';

export default class UserController implements Controller {
  path: Controller['path'] = '/users';

  router: Controller['router'] = Router();

  userRepository: Repository<User>;

  constructor() {
    this.initRoutes();
  }

  public mountRepository() {
    this.userRepository = getRepository(User);
  }

  public async create(req: Request, res: Response) {
    const { email, username, password } = req.body;

    try {
      const user = new User();
      user.email = email;
      user.username = username;
      user.password = password;

      await this.userRepository.save(user);

      return res.status(200).json(user);
    } catch (e) {
      console.error(e);

      return res.status(500).send('User creation failed :(');
    }
  }

  public async getUsers(req: Request, res: Response) {
    let { order, start, limit } = { ...req.query } as unknown as {
      order: string | undefined;
      start: number | undefined;
      limit: number | undefined;
    };

    if (order === undefined) {
      order = 'DESC';
    }
    if (start === undefined) {
      start = 0;
    }
    if (limit === undefined) {
      limit = 10;
    }

    try {
      let users = await this.userRepository.find();

      if (order === 'ASC') {
        users = users.sort((a, b) => (a.createdAt.getTime() > b.createdAt.getTime() ? 1 : -1));
      } else if (order === 'DESC') {
        users = users.sort((a, b) => (b.createdAt.getTime() > a.createdAt.getTime() ? 1 : -1));
      }

      users = users.slice(start - 1, limit);

      return res.status(200).json(users);
    } catch (e) {
      console.error(e);

      return res.status(500).send('Users search failed :(');
    }
  }

  public async getUser(req: Request, res: Response) {
    const {
      params: { id },
    } = req;

    try {
      const user = await this.userRepository.findOne(id);

      return res.status(200).json(user);
    } catch (e) {
      console.error(e);

      return res.status(500).send('User search failed :(');
    }
  }

  public async updateUser(req: Request, res: Response) {
    const {
      params: { id },
    } = req;
    const { email, username, password } = req.body;

    try {
      const user = await this.userRepository.findOne(id);

      user.email = email;
      user.username = username;
      user.password = password;

      await this.userRepository.save(user);

      return res.status(200).json(user);
    } catch (e) {
      console.error(e);

      return res.status(500).send('Updateing user unsuccessful :(');
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const {
      params: { id },
    } = req;

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
    this.router.get(`${this.path}`, this.getUsers.bind(this));
    this.router.get(`${this.path}/:id`, this.getUser.bind(this));
    this.router.put(`${this.path}/:id`, this.updateUser.bind(this));
    this.router.delete(`${this.path}/:id`, this.deleteUser.bind(this));
  }
}
