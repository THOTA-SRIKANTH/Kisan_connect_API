import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { promisify } from 'util';
import { Express } from 'express'; // Ensure Express is imported
import multer from 'multer'; // Ensure multer is imported

// Extend the Request interface to include base64Image and multer file
interface CustomRequest extends Request {
  file?: Express.Multer.File;
  base64Image?: string;
}

// Promisify fs functions for cleaner async handling
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

// Middleware for converting image to base64
const base64Image = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');  // This returns a Response, stopping the execution of the middleware
  }

  try {
    // Read the uploaded image file asynchronously
    const data = await readFileAsync(req.file.path);

    // Convert the image to a base64 string
    req.base64Image = data.toString('base64');
  } catch (error) {
    return res.status(500).send('Failed to read file.');  // Return a Response in case of failure
  } finally {
    // Clean up the uploaded file
    try {
      await unlinkAsync(req.file.path);
    } catch (err) {
      console.error('Failed to delete file:', err);
    }
  }

  // Proceed to the next middleware/route handler
  next();
};

export default base64Image;
