import express, { Request, Response } from 'express';
import multer from 'multer';
import { Types } from 'mongoose'; // For Mongoose ObjectId typing
import fetchUser from '../middlewares/fetchUser';  // Your middleware for fetching user
import base64ImageMiddleware from '../middlewares/base64ImageMiddleware';  // Middleware to convert image to base64
import CarouselItem from '../models/Carousel';

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/carousel' });

// Custom Request type with base64Image and user added
interface CarouselRequest extends Request {
    base64Image?: string;  // Define base64Image as optional
    id?:String;
    title?:String;
}

// POST route to add a carousel item
router.post(
    "/addcarousel", 
    fetchUser, 
    upload.single('image'), 
    base64ImageMiddleware,
    async (req: CarouselRequest, res: Response) => {
        try {
            if (!req.user || !req.user.isAdmin) {
                return res.status(403).send("Only Admin can access this route");
            }

            const title = req.body.title;
            const imageBase64 = req.base64Image;  // Set by base64ImageMiddleware

            const carouselItem = await CarouselItem.create({
                image: imageBase64,
                title
            });

            res.status(200).json({ message: "Carousel item created", carouselItem });
        } catch (error: any) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

// PUT route to edit a carousel item
router.put(
    "/editcarousel",
    fetchUser,
    upload.single('image'),
    base64ImageMiddleware,
    async (req: CarouselRequest, res: Response) => {
        try {
            if (!req.user || !req.user.isAdmin) {
                return res.status(403).send("Only Admin can access this route");
            }

            const { id, title } = req.body;
            const imageBase64 = req.base64Image;

            if (!id) {
                return res.status(400).json({ message: "ID is required to edit the carousel item." });
            }
            

            // Find and update the carousel item
            const updatedCarouselItem = await CarouselItem.findByIdAndUpdate(
                id,
                { title, image: imageBase64 },
                { new: true }
            );

            if (!updatedCarouselItem) {
                return res.status(404).json({ message: "Carousel item not found." ,id,updatedCarouselItem});
            }
            res.status(200).json({ message: "Carousel item updated", updatedCarouselItem });
        } catch (error: any) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);


// DELETE route to remove a carousel item
router.delete(
    "/deletecarousel", 
    fetchUser,
    async (req: CarouselRequest, res: Response) => {
        try {
            if (!req.user || !req.user.isAdmin) {
                return res.status(403).send("Only Admin can access this route");
            }

            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ message: "ID is required to delete the carousel item." });
            }

            // Find and delete the carousel item
            const deletedCarouselItem = await CarouselItem.findByIdAndDelete(id);

            if (!deletedCarouselItem) {
                return res.status(404).json({ message: "Carousel item not found." });
            }

            res.status(200).json({ message: "Carousel item deleted successfully." });
        } catch (error: any) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);


export default router;
