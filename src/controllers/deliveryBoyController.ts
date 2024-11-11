import express from "express";
import { Request, Response } from "express";
import User from "../models/User";
import fetchUser from "../middlewares/fetchUser";

const router = express.Router();

// Updated route to handle user ID in request body (instead of query)
router.put("/makeDeliveryBoy", fetchUser, async (req: Request, res: Response) => {
    try {
        // Check if the user is an admin
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).send("Only Admin can access this route");
        }

        const { id } = req.body;  // Get the ID from the request body

        // Check if ID is provided
        if (!id) {
            return res.status(400).send("User ID is required");
        }

        // Fetch user by ID
        const user = await User.findById(id).select('-password');

        // If no user is found
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Update user's role
        user.roles.isDeliveryBoy = true;

        // Save updated user details
        await user.save();

        // Return the updated user
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.put("/removeDeliveryBoy", fetchUser, async (req: Request, res: Response) => {
    try {
        // Check if the user is an admin
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).send("Only Admin can access this route");
        }

        const { id } = req.body;  // Get the ID from the request body

        // Check if ID is provided
        if (!id) {
            return res.status(400).send("User ID is required");
        }

        // Fetch user by ID
        const user = await User.findById(id).select('-password');

        // If no user is found
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Update user's role
        user.roles.isDeliveryBoy = false;

        // Save updated user details
        await user.save();

        // Return the updated user
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

export default router;
