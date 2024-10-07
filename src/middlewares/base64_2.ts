import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { promisify } from 'util';
import { Express } from 'express'; // Ensure Express is imported
import { Multer } from 'multer'; // Make sure Multer types are properly imported

// Extend the Request interface to include multiple files in both possible formats
interface CustomRequest extends Request {
    files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
    base64Images?: {
        farmPhoto: string;
        proofPhoto: string;
    };
}


// Promisify fs functions for cleaner async handling
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

// Middleware for converting two images to base64
const base64TwoImages = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    // Handle the case where `files` can be in two formats: array or object
    let filesArray: Express.Multer.File[] | undefined;

    // If `files` is an array, use it directly
    if (Array.isArray(req.files)) {
        filesArray = req.files;
    }
    // If `files` is an object, retrieve the arrays by field name
    else if (req.files && typeof req.files === 'object') {
        filesArray = Object.values(req.files).flat();  // Flatten the array of files
    }

    // Validate we have at least two files
    if (!filesArray || filesArray.length < 2) {
        return res.status(400).send('Two files are required.');
    }

    try {
        // Read and convert the images to base64
        const farmPhotoData = await readFileAsync(filesArray[0].path);
        const proofPhotoData = await readFileAsync(filesArray[1].path);

        // Store base64-encoded images in the request object
        req.base64Images = {
            farmPhoto: farmPhotoData.toString('base64'),
            proofPhoto: proofPhotoData.toString('base64'),
        };
    } catch (error) {
        return res.status(500).send('Failed to process files.');
    } finally {
        // Clean up the uploaded files
        try {
            await unlinkAsync(filesArray[0].path);
            await unlinkAsync(filesArray[1].path);
        } catch (err) {
            console.error('Failed to delete files:', err);
        }
    }

    // Proceed to the next middleware/route handler
    next();
};

export default base64TwoImages;
