import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

config();

export class Protected {
  async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }

      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
      
      if (typeof decoded !== 'object' || !('userId' in decoded)) {
        throw new Error('Invalid token payload');
      }
      
      req.body.user = decoded as jwt.JwtPayload;
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: 'Invalid token', error: error.message });
      } else {
        res.status(401).json({ message: 'Invalid token', error: String(error) });
      }
    }
  }

  static generateToken(userId: string): string {
    return jwt.sign(
      { userId }, 
      `${process.env.JWT_SECRET}`, 
      { expiresIn: '24h' }
    );
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}