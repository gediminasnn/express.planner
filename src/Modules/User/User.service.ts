import { Repository, getRepository } from 'typeorm';

import User from './User.entity';

import { PaginationVariables, UserService as IUserService } from './types';

export default class UserService implements IUserService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public postUser(email: string, username: string, password: string) {
    const user = this.userRepository.create({ email, username, password });
    return this.userRepository.save(user);
  }

  public getUsers(
    order: PaginationVariables['order'],
    start: PaginationVariables['start'],
    limit: PaginationVariables['limit'],
  ) {
    return this.userRepository.find({ order: { createdAt: order }, take: limit, skip: start });
  }

  public getUser(id: string) {
    return this.userRepository.findOneOrFail(id);
  }

  public async updateUser(id: string, email: string, username: string, password: string) {
    const user = await this.userRepository.findOneOrFail(id);

    return this.userRepository.save({ ...user, email, username, password });
  }

  public deleteUser(id: string) {
    return this.userRepository.softDelete(id);
  }
}
