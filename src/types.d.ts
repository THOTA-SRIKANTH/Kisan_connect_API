import { UserPayload } from './middlewares/authMiddleware'; // Import your UserPayload type

// Extend the Express namespace to include the user field on the Request object
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Add optional user field to the Request
    }
  }
}
