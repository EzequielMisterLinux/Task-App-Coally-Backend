import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

config();

interface JwtPayload {
    userId: string;
}

export class Protected {
    async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.cookies.auth_token;
            
            if (!token) {
                res.status(401).json({ message: 'Authentication required' });
                return;
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            req.body.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({
                message: 'Invalid or expired token',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static generateToken(userId: string): string {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        return jwt.sign(
            { userId },
            process.env.JWT_SECRET,
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