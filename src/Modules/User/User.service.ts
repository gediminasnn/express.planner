import { Repository, getRepository } from 'typeorm';

import UserEntity from './User.entity';

import { PaginationVariables, UserService as IUserService } from './types';

export default class UserService implements IUserService {
  userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = getRepository(UserEntity);
  }

  public createUser(email: string, password: string, username?: string) {
    const user = this.userRepository.create({ email, password, username });

    user.hashPassword();

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

  public getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  public async updateUser(id: string, email: string, username: string, password: string) {
    const user = await this.userRepository.findOneOrFail(id);

    user.hashPassword();

    return this.userRepository.save({ ...user, email, username, password });
  }

  public deleteUser(id: string) {
    return this.userRepository.softDelete(id);
  }
}
