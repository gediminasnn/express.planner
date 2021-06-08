import { UpdateResult } from 'typeorm';

import User from '../Entities/User';

interface UserService {
  createUser(email: string, username: string, password: string): Promise<User>;
  findManyUsers({ order, start, limit }): Promise<User[]>;
  findOneUser(id: string): Promise<User>;
  updateUser(id: string, email: string, username: string, password: string): Promise<User>;
  deleteUser(id: string): Promise<UpdateResult>;
}

export default UserService;
