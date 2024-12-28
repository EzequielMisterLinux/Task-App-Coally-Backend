import { User } from '../models/UserModel';

type UserDataAuth = Pick<User, "email" | "password">;

export interface UserInterface {
  create(userData: Partial<User>)          : Promise<User>;
  login(userData: Partial<UserDataAuth>)   : Promise<User | null>;
  findByEmail(email: string)               : Promise<User | null>;
}