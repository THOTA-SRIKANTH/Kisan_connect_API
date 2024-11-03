import mongoose, { Schema, Document } from 'mongoose';



// Define the DeliveryItemsDocument interface extending Document
interface DeliveryItemsDocument extends Document {
    userId: mongoose.Schema.Types.ObjectId; // Reference to User model
    productId: mongoose.Schema.Types.ObjectId; // Reference to Product model
    productName:string;
    address: {
        doorNo?: string;
    area?: string;
    landmark?: string;
    district?: string;
    state?: string;
    pincode?: string;
    };
    quantity: number;
    amount: number;
}

// Define the DeliveryItemsSchema
const DeliveryItemsSchema: Schema<DeliveryItemsDocument> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to Product model
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    address: {
        doorNo: { type: String },
        area: { type: String },
        landmark: { type: String },
        district: { type: String },
        state: { type: String },
        pincode: { type: String }
    },
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true }
});

// Create the DeliveryItems model from the schema and export it
const DeliveryItemsModel = mongoose.model<DeliveryItemsDocument>('DeliveryItems', DeliveryItemsSchema);

export default DeliveryItemsModel;
