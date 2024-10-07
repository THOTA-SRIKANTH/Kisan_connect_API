import express, { Request, Response } from 'express';
import multer from 'multer';
import base64TwoImages from '../middlewares/base64_2';  // New middleware for converting two images to base64
import FarmerApplication from '../models/FarmerApplication';  // FarmerApplication model
import User from "../models/User"
import fetchUser from "../middlewares/fetchUser";

const router = express.Router();

// Multer configuration for handling two image uploads
const upload = multer({ dest: 'uploads/' });

// Extend the Request interface to include base64Image and multer file
interface CustomRequest extends Request {
    files?: {
        farmPhoto?: Express.Multer.File[];
        proofPhoto?: Express.Multer.File[];
    };
    base64Images?: {
        farmPhoto: string;
        proofPhoto: string;
    };
}

router.get("/", (req: Request, res: Response) => {
    res.send("Working");
});

// Route to handle farmer application submission
router.post(
    '/addFarmerApplication',
    upload.fields([
      { name: 'farmPhoto', maxCount: 1 },
      { name: 'proofPhoto', maxCount: 1 },
    ]), // Expect specific field names for image uploads
    base64TwoImages, // Middleware to convert images to base64
    async (req: Request, res: Response) => {
      try {
        const customReq = req as CustomRequest; // Cast to access custom fields
        const { userId, farmLocation, farmSize, experience } = req.body;
        const { farmPhoto, proofPhoto } = customReq.base64Images!;
  
        // Check if the user with the given userId exists in the User collection
        const userExists = await User.findById(userId);
        if (!userExists) {
          return res.status(404).json({ message: 'User not found. Please provide a valid user ID.' });
        }
  
        // Check if a farmer application already exists for the given userId
        const existingApplication = await FarmerApplication.findOne({ userId });
        if (existingApplication) {
          return res.status(400).json({ message: 'A farmer application for this user already exists.' });
        }
  
        // Create new farmer application
        const farmerApplication = new FarmerApplication({
          userId,
          farmLocation,
          farmSize,
          experience,
          farmPhoto,
          photoOfProofThatHeIsFarmer: proofPhoto,
          isApproved: false, // Admin will update this later
        });
  
        // Save the new application to the database
        await farmerApplication.save();
        res.status(201).json({ message: 'Farmer application submitted successfully' });
      } catch (error) {
        console.error('Error submitting farmer application:', error);
        res.status(500).send('Server Error');
      }
    }
  );
  

// Route to get all farmer applications where isApproved is false (pending approval)
router.get(
    '/getAllFarmerApplicants',
    fetchUser,
    async (req: Request, res: Response) => {
      try {

        if (!req.user || !req.user.isAdmin) {
            return res.status(403).send("Only Admins can access this route");
        }

        // Fetch all farmer applications where isApproved is false
        const list = await FarmerApplication.find({ isApproved: false });
  
        res.status(200).send(list);
      } catch (error) {
        console.error('Error fetching farmer applications:', error);
        res.status(500).send('Server Error');
      }
    }
  );


 
  
// Route to approve a farmer's application and update user's role
router.put(
  '/approveFarmer/:farmerApplicationId',
  fetchUser,
  async (req: Request, res: Response) => {
    const { farmerApplicationId } = req.params;

    try {

        if (!req.user || !req.user.isAdmin) {
            return res.status(403).send("Only Admins can access this route");
        }

      // Find the farmer application by ID
      const farmerApplication = await FarmerApplication.findById(farmerApplicationId);

      if (!farmerApplication) {
        return res.status(404).send('Farmer application not found');
      }

      // Check if the application is already approved
      if (farmerApplication.isApproved) {
        return res.status(400).send('Farmer application is already approved');
      }

      // Approve the farmer application (set isApproved to true)
      farmerApplication.isApproved = true;
      await farmerApplication.save();

      // Find the corresponding user by userId in the farmerApplication
      const user = await User.findById(farmerApplication.userId);

      if (!user) {
        return res.status(404).send('User not found');
      }

      // Update the user's role to make them a farmer (set roles.isFarmer to true)
      user.roles.isFarmer = true;
      await user.save();

      // Send success response
      res.status(200).send({
        message: 'Farmer application approved and user role updated',
        farmerApplication,
        user,
      });
    } catch (error) {
      console.error('Error approving farmer application:', error);
      res.status(500).send('Server Error');
    }
  }
);



export default router;
