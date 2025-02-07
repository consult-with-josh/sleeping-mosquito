import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).send({ message: 'Authentication token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }; // Adjust type to your payload
    req.user = decoded; // Attach user information to the request object

    return next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).send({ message: 'Invalid or expired token.' });
  }
};
