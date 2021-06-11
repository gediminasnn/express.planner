import jwt from 'jsonwebtoken';

import User from '../User/User.entity';
import UserService from '../User/User.service';

import { UserService as IUserService } from '../User/types';
import { AuthService as IAuthService, AuthValues, JwtData } from './types';

const { JWT_SECRET } = process.env;

export default class AuthService implements IAuthService {
  userService: IUserService;

  constructor() {
    this.userService = new UserService();
  }

  public async authUser(email: string, password: string): Promise<AuthValues> {
    if (!email || !password) {
      throw new Error('Empty email or password');
    }

    let encryptedJwt: string;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      const newUser = await this.userService.createUser(email, password);

      encryptedJwt = jwt.sign({ id: newUser.id }, JWT_SECRET);

      return { isNewUser: true, encryptedJwt };
    }

    if (!user.validatePassword(password)) {
      throw new Error('Invalid password');
    } else {
      encryptedJwt = jwt.sign({ id: user.id }, JWT_SECRET);

      return { isNewUser: false, encryptedJwt };
    }
  }

  afterAuth(authorization: string): Promise<User> {
    if (!authorization) {
      throw new Error('Authorization header missing');
    }

    const { id } = jwt.verify(authorization, JWT_SECRET) as JwtData;

    if (!id) {
      throw new Error('Id in decoded jwt token is missing');
    }

    return this.userService.getUser(id);
  }
}
