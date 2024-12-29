import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { UserModel } from '../models/UserModel';
import { Protected } from '../middlewares/security/Protected';

interface UserControllerInterface {
    createUser(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
}

export class UserController implements UserControllerInterface {
    protected userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { names, lastnames, age, email, password } = req.body;
    
            if (!names || !lastnames || !age || !email || !password) {
                res.status(400).json({ message: 'All fields are required' });
                return;
            }
    
            if (!req.file) {
                res.status(400).json({ message: 'Profile image is required' });
                return;
            }
    
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }
    
            const hashedPassword = await Protected.hashPassword(password);
            const profileImagePath = `/uploads/${req.file.filename}`;
    
            const user = await this.userRepository.create({
                names,
                lastnames,
                age,
                email,
                password: hashedPassword,
                profileImage: profileImagePath,
            });
    
            const token = Protected.generateToken(user._id.toString());
            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/'
            });
    
            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: user._id.toString(),
                    names: user.names,
                    email: user.email,
                    profileImage: profileImagePath,
                }
            });
        } catch (error) {
            console.error('Create user error:', error);
            res.status(500).json({
                message: 'An error occurred while creating the user',
            });
        }
    };
    

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required' });
                return;
            }

            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const isValidPassword = await Protected.comparePassword(password, user.password);
            if (!isValidPassword) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const token = Protected.generateToken(user._id.toString());
            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/'
            });

            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user._id.toString(),
                    names: user.names,
                    email: user.email,
                    lastnames: user.lastnames,
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                message: 'An error occurred while logging in',
            });
        }
    }

    logout = async (req: Request, res: Response): Promise<void> => {
        try {

            res.cookie('auth_token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: new Date(0), 
                path: '/'
            });

            res.status(200).json({
                message: 'Logged out successfully'
            });
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({
                message: 'An error occurred while logging out'
            });
        }
    }
}