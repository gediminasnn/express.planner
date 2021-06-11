import { Repository, UpdateResult } from 'typeorm';

import User from './User.entity';

export type PaginationVariables = { order?: Order; start?: number; limit?: number };

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface UserService {
  userRepository: Repository<User>;
  createUser: (email: string, password: string, username?: string) => Promise<User>;
  getUsers: (
    order: PaginationVariables['order'],
    start: PaginationVariables['start'],
    limit: PaginationVariables['limit'],
  ) => Promise<User[]>;
  getUser: (id: string) => Promise<User>;
  getUserByEmail: (email: string) => Promise<User>;
  updateUser: (id: string, email: string, username: string, password: string) => Promise<User>;
  deleteUser: (id: string) => Promise<UpdateResult>;
}
