import { User, UserModel } from '../models/UserModel';
import { UserInterface } from "../interfaces/UserInterface";

export class UserRepository implements UserInterface {
  async create(userData: Partial<User>): Promise<User> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async login(userData: Partial<{ email: string; password: string; }>): Promise<User | null> {
    return await UserModel.findOne({ email: userData.email });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }
}

