import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined in environment variables');

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const secretKey = JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

export default authMiddleware;