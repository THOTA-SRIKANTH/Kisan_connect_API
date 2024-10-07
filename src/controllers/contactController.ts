import { Request, Response } from 'express';
import ContactForm from '../models/ContactForum';

export const submitContactForm = async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message } = req.body;

        // Create a new contact form entry
        const newContactForm = new ContactForm({
            name,
            email,
            subject,
            message,
        });

        // Save the contact form entry to the database
        await newContactForm.save();

        res.status(201).json({ message: 'Contact form submitted successfully.' });
    } catch (error: any) {
        console.error('Error submitting contact form:', error);
        res.status(500).send('Server Error');
    }
};

