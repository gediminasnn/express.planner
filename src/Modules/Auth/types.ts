import User from '../User/User.entity';
import { UserService as IUserService } from '../User/types';

export interface JwtData {
  id: string;
}

export type AuthValues = {
  isNewUser: boolean;
  encryptedJwt: string;
};

export interface AuthService {
  userService: IUserService;
  authUser: (email: string, password: string) => Promise<AuthValues>;
  afterAuth: (authorization: string) => Promise<User>;
}
