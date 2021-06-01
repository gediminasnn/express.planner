import express from 'express';
import { createConnection, getRepository, Repository } from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import ormConfig from '../ormconfig';
import { validateEnv, initLogger } from './Utils/Bootstrap';
import User from './Entities/User';

import IBootstrap from './Types/Bootstrap';
import Controller from './Types/Controller';

export default class Bootstrap implements IBootstrap {
  public app: express.Application;

  private port = process.env.API_PORT || 1338;

  private controllers: Controller[];

  private ormConfig = ormConfig[process.env.NODE_ENV];

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
    this.app.get('/', (_, res: express.Response) => res.send('Hello World!'));

    this.controllers.forEach((controller: Controller) => this.app.use(controller.router));
  }

  async initializeConnection() {
    try {
      await createConnection(this.ormConfig);
    } catch (e) {
      throw new Error(e);
    }

    console.info('Mysql connection established!');
  }

  listen(): void {
    this.app.get('/create', async (_, res: express.Response) => {
      try {
        const userRepository: Repository<User> = getRepository(User);

        const user = new User();
        user.email = faker.internet.email();
        user.username = faker.internet.userName();
        user.password = faker.internet.password();

        await userRepository.save(user);

        return res.status(200).json({
          data: user,
          message: 'User saved successfully',
        });
      } catch (e) {
        return res.status(500).json(e);
      }
    });

    this.app.get('/findall', async (_, res: express.Response) => {
      try {
        const userRepository: Repository<User> = getRepository(User);

        const users = await userRepository.find();

        return res.json(users);
      } catch (e) {
        return res.status(500).json(e);
      }
    });

    this.app.get('/update', async (_, res: express.Response) => {
      try {
        const userRepository: Repository<User> = getRepository(User);

        const users = await userRepository.find();
        const usersIds = users.map((user) => user.id);
        const randomUserId = usersIds[Math.floor(Math.random() * usersIds.length)];
        const user = await userRepository.findOne(randomUserId);

        user.username = 'changed';

        await userRepository.save(user);

        return res.status(200).json({
          data: user,
          message: 'User updated successfully',
        });
      } catch (e) {
        return res.status(500).json(e);
      }
    });

    this.app.listen(this.port, () => {
      return console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}
