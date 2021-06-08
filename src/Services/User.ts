import { Repository, getRepository } from 'typeorm';

import User from '../Entities/User';

// TODO: Add interface for UserService
export default class UserService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public createUser(email: string, username: string, password: string) {
    const user = this.userRepository.create({ email, username, password });
    return this.userRepository.save(user);
  }
}
