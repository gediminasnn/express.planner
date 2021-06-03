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

  public initRepository() {
    this.userRepository = getRepository(User);
  }

  public async postUser(req: Request, res: Response) {
    const { email, username, password } = req.body;

    try {
      const user = new User();
      user.email = email;
      user.username = username;
      user.password = password;

      await this.userRepository.save(user);

      return res.status(200).json({
        data: user,
        message: 'User saved successfully',
      });
    } catch (e) {
      console.error(e);

      return res.status(500).json('User creation failed :(');
    }
  }

  public async getUsers(_, res: Response) {
    try {
      const users = await this.userRepository.find();

      return res.status(200).json(users);
    } catch (e) {
      console.error(e);

      return res.status(500).json('Users search failed :(');
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

      return res.status(500).json('User search failed :(');
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

      return res.status(200).json({
        data: user,
        message: 'User updated successfully',
      });
    } catch (e) {
      console.error(e);

      return res.status(500).json('Updateing user unsuccessful :(');
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const {
      params: { id },
    } = req;

    try {
      await this.userRepository.softDelete(id);

      return res.status(200).json({
        message: `User ${id} deletion successful`,
      });
    } catch (e) {
      console.error(e);

      return res.status(500).json('Deleting user unsuccessful :(');
    }
  }

  public async undeleteUser(req: Request, res: Response) {
    const {
      params: { id },
    } = req;

    try {
      await this.userRepository.restore(id);

      return res.status(200).json({
        message: `User ${id} undeletion successful`,
      });
    } catch (e) {
      console.error(e);

      return res.status(500).json('User undeletion unsuccessful :(');
    }
  }

  initRoutes() {
    this.router.post(`${this.path}`, this.postUser.bind(this));
    this.router.get(`${this.path}`, this.getUsers.bind(this));
    this.router.get(`${this.path}/:id`, this.getUser.bind(this));
    this.router.put(`${this.path}/:id`, this.updateUser.bind(this));
    this.router.delete(`${this.path}/:id`, this.deleteUser.bind(this));
    this.router.put(`${this.path}/undelete/:id`, this.undeleteUser.bind(this));
  }
}
