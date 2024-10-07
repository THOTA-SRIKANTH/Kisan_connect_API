import express, { Request, Response } from 'express';
import CarouselItem from '../models/Carousel';
import ProductItem from "../models/Product"
import {getAllByCategory,getAllByProductName} from "../controllers/farmerController"
import {submitContactForm} from "../controllers/contactController"


const router = express.Router();

// GET all carousel items
router.get('/getAllCarousels', async (_req: Request, res: Response) => {
    try {
        const carouselItems = await CarouselItem.find();
        res.status(200).json(carouselItems);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// GET all product items
router.get('/getAllProducts', async (_req: Request, res: Response) => {
    try {
        const productItems = await ProductItem.find(); 
        res.status(200).json(productItems);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


// Define the route for fetching all fruits
router.get("/getAllFruits", async (_req: Request, res: Response) => {
    try {
        // Use the getAllByCategory function to fetch products by category "Fruits"
        const productItems = await getAllByCategory("Fruits");
        
        // Return the result as a response
        res.status(200).json(productItems);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Define the route for fetching all vegetables
router.get("/getAllVegetables", async (_req: Request, res: Response) => {
    try {
        // Use the getAllByCategory function to fetch products by category "Vegetables"
        const productItems = await getAllByCategory("Vegetables");
        res.status(200).json(productItems);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Define the route for fetching all grains
router.get("/getAllGrains", async (_req: Request, res: Response) => {
    try {
        // Use the getAllByCategory function to fetch products by category "Grains"
        const productItems = await getAllByCategory("Grains");
        res.status(200).json(productItems);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Define the route for fetching all dairy products
router.get("/getAllDairy", async (_req: Request, res: Response) => {
    try {
        // Use the getAllByCategory function to fetch products by category "Dairy"
        const productItems = await getAllByCategory("Dairy");
        res.status(200).json(productItems);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Define the route for fetching all other products
router.get("/getAllOthers", async (_req: Request, res: Response) => {
    try {
        // Use the getAllByCategory function to fetch products by category "Others"
        const productItems = await getAllByCategory("Others");
        res.status(200).json(productItems);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


// Define the route for fetching products by matching name
router.get("/getAllProductsByName", async (req: Request, res: Response) => {
    try {
        // Extract the name from query parameters
        const { name } = req.query;

        // Validation: Ensure the name parameter is present and is a string
        if (!name || typeof name !== "string") {
            return res.status(400).json({ message: "Product name is required" });
        }

        // Use the getAllByProductName function to fetch products by name
        const productItems = await getAllByProductName(name);

        // Return the result as a response
        res.status(200).json(productItems);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


router.post('/submitContactForm', submitContactForm);

export default router;

