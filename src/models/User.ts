import { Schema, model, Document } from 'mongoose';

// Interface for the user
interface Address {
    doorNo?: string;
    area?: string;
    landmark?: string;
    district?: string;
    state?: string;
    pincode?: string;
}

interface Roles {
    isAdmin?: boolean;
    isDeliveryBoy?: boolean;
    isFarmer?: boolean;
    isCustomer?: boolean;
}

// Extend the Document interface to include custom fields for User
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address?: Address;
    roles: Roles;
}

// Define the schema
const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        doorNo: { type: String,default:"Not Provided" },
        area: { type: String,default:"Not Provided" },
        landmark: { type: String ,default:"Not Provided"},
        district: { type: String ,default:"Not Provided"},
        state: { type: String ,default:"Not Provided"},
        pincode: { type: String ,default:"Not Provided"},
    },
    roles: {
        isAdmin: { type: Boolean, default: false },
        isDeliveryBoy: { type: Boolean, default: false },
        isFarmer: { type: Boolean, default: false },
        isCustomer: { type: Boolean, default: true },
    }
});

// Create and export the model
const User = model<IUser>('User', userSchema);
export default User;
