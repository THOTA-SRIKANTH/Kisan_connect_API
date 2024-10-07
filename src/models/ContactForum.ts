import mongoose, { Document, Schema, model } from 'mongoose';

// Define the interface for the Contact document
export interface ContactDocument extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt?: Date;  // Optional: timestamp for when the contact was created
}

// Define the schema for the Contact model
const ContactSchema: Schema<ContactDocument> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please provide a valid email address.'], // Basic email validation
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Automatically set the creation timestamp
    },
});

// Create the model from the schema and export it
const ContactForum = model<ContactDocument>('ContactForum', ContactSchema);
export default ContactForum;
