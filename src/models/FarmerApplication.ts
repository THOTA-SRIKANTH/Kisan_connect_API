import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Farmer application
interface IFarmerApplication extends Document {
    userId: mongoose.Schema.Types.ObjectId;  // Reference to the User model
    farmLocation: string;  // Location of the farm
    farmSize: string;  // Size of the farm (e.g., in acres)
    experience: string;  // Number of years of experience
    farmPhoto: string;  // Path to the uploaded photo of the farm
    photoOfProofThatHeIsFarmer: string;  // Path to the uploaded proof of farmer document
    isApproved: boolean;  // Boolean to check if the user is approved as a farmer by the admin
}

// Define the schema for the Farmer application
const FarmerApplicationSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
    farmLocation: {
        type: String,
        required: true
    },
    farmSize: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    farmPhoto: {
        type: String,
        required: true
    },
    photoOfProofThatHeIsFarmer: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false  // Initially false, admin will update this to true after approval
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt timestamps
});

// Export the model
export default mongoose.model<IFarmerApplication>('FarmerApplication', FarmerApplicationSchema);
