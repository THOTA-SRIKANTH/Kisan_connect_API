import express from "express";
import { Request, Response } from "express";
import User from "../models/User";
import fetchUser from "../middlewares/fetchUser";

const router = express.Router();

// Updated route to handle email in query parameters instead of route params
router.get("/getUserById", fetchUser, async (req: Request, res: Response) => {
    try {
        // Check if the user is an admin
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).send("Only Admin can access this route");
        }

        // Get the email from the query parameters
        const { email } = req.query;

        if (!email || typeof email !== 'string') {
            return res.status(400).send("Email is required");
        }

        // Fetch user based on email
        const user = await User.find({ email }).select('-password');

        // If no user is found
        if (user.length === 0) {
            return res.status(404).send("User not found");
        }

        // Return the found user(s)
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

export default router;
