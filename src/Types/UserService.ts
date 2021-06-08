import { UpdateResult, Repository } from 'typeorm';

import User from '../Entities/User';

import { PaginationVariables } from './User';

interface UserService {
  userRepository: Repository<User>;
  createUser(email: string, username: string, password: string): Promise<User>;
  findManyUsers(
    order: PaginationVariables['order'],
    start: PaginationVariables['start'],
    limit: PaginationVariables['limit'],
  ): Promise<User[]>;
  findOneUser(id: string): Promise<User>;
  updateUser(id: string, email: string, username: string, password: string): Promise<User>;
  deleteUser(id: string): Promise<UpdateResult>;
}

export default UserService;
