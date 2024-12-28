import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { UserModel } from '../models/UserModel';
import { Protected } from '../middlewares/security/Protected';

interface UserControllerInterface {
  createUser(req: Request, res: Response) : Promise<Response>;
  login(req: Request, res: Response)      : Promise<Response>;
}

export class UserController implements UserControllerInterface {
  protected userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { names, lastnames, age, email, password } = req.body;


      if (!names || !lastnames || !age || !email || !password) return res.status(400).json({ message: 'All fields are required' });
      

      const existingUser = await UserModel.findOne({ email });
      
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
      

      const hashedPassword = await Protected.hashPassword(password);
      
      const user = await this.userRepository.create({
        names,
        lastnames,
        age,
        email,
        password: hashedPassword,
      });

      const token = Protected.generateToken(user._id.toString());

      return res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: user._id.toString(),
          names: user.names,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Create user error:', error);
      return res.status(500).json({
        message: 'An error occurred while creating the user',
      });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
      

      const user = await this.userRepository.findByEmail(email);
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    

      const isValidPassword = await Protected.comparePassword(password, user.password);
      
      if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });
      

      const token = Protected.generateToken(user._id.toString());

      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id.toString(),
          names: user.names,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        message: 'An error occurred while logging in',
      });
    }
  }
}