import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define a type for the user data attached to the request
export interface UserPayload {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  isFarmer: boolean;
  isDeliveryBoy: boolean;
  // Add other fields as needed
}

// Extend the Express Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const fetchUser = (req: Request, res: Response, next: NextFunction): any => {
  // Get the token from the header
  const token = req.header("auth-token");
  // console.log(token)

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }


  try {
    // Verify the token and cast the result to UserPayload
    const data = jwt.verify(token, 'Revanth') as UserPayload;
    // Attach user data to the request object
    req.user = data; // TypeScript now recognizes 'user' on req


    next();
  } catch (err) {
    // If the token is invalid or expired

    
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

export default fetchUser;
