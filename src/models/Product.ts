import mongoose, { Document, Schema, model } from 'mongoose';

// Define the Product interface extending mongoose Document
export interface ProductDocument extends Document {
    productName: string;
    category: string;
    description: string;
    price: number;
    unit: string;  // kg, liters, etc.
    stock: number;
    image: string;  // URL or Base64 for the image
    harvestDate: Date;
    expiryDate: Date;
    farmingMethod: string;  // Organic, Traditional, etc.
    deliveryTime: string;  // Time estimate in hours or days
    userId: mongoose.Schema.Types.ObjectId; // Reference to the User (Farmer) model
}

// Define the Product schema
const ProductSchema: Schema<ProductDocument> = new Schema({
    productName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Others'],  // Example categories
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        enum: ['kg', 'liter', 'dozen', 'unit'],  // Example units
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true,  // Can be a URL or Base64 encoded string
    },
    harvestDate: {
        type: Date,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    farmingMethod: {
        type: String,
        required: true,
        enum: ['Organic', 'Traditional', 'Hydroponic', 'Others'],  // Example methods
    },
    deliveryTime: {
        type: String,
        required: true,  // Example: "2-3 days"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Refers to the 'User' model (or Farmer model if separate)
        required: true,
    }
});

// Create the Product model from the schema and export it
const Product = model<ProductDocument>('Product', ProductSchema);
export default Product;
