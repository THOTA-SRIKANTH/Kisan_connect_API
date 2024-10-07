import express, { Request, Response } from "express";
import multer from "multer";
import fetchUser from "../middlewares/fetchUser";
import base64ImageMiddleware from "../middlewares/base64ImageMiddleware";
import ProductItem from "../models/Product";

const router = express.Router();

interface ProductRequest extends Request {
    base64Image?: string;  // Define base64Image as optional
    user?: any;  // Assuming user comes from fetchUser middleware
}

// Set up multer for image upload handling
const upload = multer({ dest: 'uploads/products' });

// Test route
router.post("/", (req: Request, res: Response) => {
    res.send("Hello, working");
});

// Route to add a product
router.post(
    "/addproduct", 
    fetchUser, 
    upload.single('image'), 
    base64ImageMiddleware, // Middleware that handles converting image to base64
    async (req: ProductRequest, res: Response) => {
        try {
            // Ensure only Farmers can add products
            if (!req.user || !req.user.isFarmer) {
                return res.status(403).send("Only Farmers can access this route");
            }

            const {
                productName,
                category,
                description,
                price,
                unit,
                stock,
                expiryDate,
                farmingMethod,
                harvestDate,
                deliveryTime
            } = req.body;

            // The base64 image should be retrieved from the middleware
            const imageBase64 = req.base64Image;

            if (!imageBase64) {
                return res.status(400).json({ message: "Image is required" });
            }

            // Create the new product item with the associated farmer's user ID
            const productItem = await ProductItem.create({
                image: imageBase64,
                productName,
                category,
                description,
                price,
                unit,
                stock,
                expiryDate,
                farmingMethod,
                harvestDate,
                deliveryTime,
                userId: req.user.id // Set the farmer's ID (from the fetched user) as the userId
            });

            res.status(200).json({ message: "Product item created successfully", productItem });
        } catch (error: any) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

// PUT route to edit a product
router.put(
    "/editproduct",
    fetchUser,
    upload.single('image'),
    base64ImageMiddleware,
    async (req: ProductRequest, res: Response) => {
        try {
            if (!req.user || !req.user.isFarmer) {
                return res.status(403).send("Only Farmers can access this route");
            }

            const { id, productName, category, description, price, unit, stock, expiryDate, farmingMethod, harvestDate, deliveryTime } = req.body;
            const imageBase64 = req.base64Image;

            if (!id) {
                return res.status(400).json({ message: "ID is required to edit the product." });
            }

            // Find the product by ID
            const product = await ProductItem.findById(id);

            if (!product) {
                return res.status(404).json({ message: "Product not found." });
            }

            // Check if the product belongs to the authenticated farmer
            if (product.userId.toString() !== req.user.id) {
                return res.status(403).json({ message: "You do not have permission to edit this product." });
            }

            // Update the product details
            const updatedProduct = await ProductItem.findByIdAndUpdate(
                id,
                { productName, category, description, price, unit, stock, expiryDate, farmingMethod, harvestDate, deliveryTime, image: imageBase64 },
                { new: true }
            );

            res.status(200).json({ message: "Product updated successfully", updatedProduct });
        } catch (error: any) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);


// DELETE route to remove a product
router.delete(
    "/deleteproduct", 
    fetchUser,
    async (req: ProductRequest, res: Response) => {
        try {
            if (!req.user || !req.user.isFarmer) {
                return res.status(403).send("Only Farmers can access this route");
            }

            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ message: "ID is required to delete the product." });
            }

            // Find the product by ID
            const product = await ProductItem.findById(id);

            if (!product) {
                return res.status(404).json({ message: "Product not found." });
            }

            // Check if the product belongs to the authenticated farmer
            if (product.userId.toString() !== req.user.id) {
                return res.status(403).json({ message: "You do not have permission to delete this product." });
            }

            // Delete the product
            await ProductItem.findByIdAndDelete(id);

            res.status(200).json({ message: "Product deleted successfully." });
        } catch (error: any) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);



export default router;
