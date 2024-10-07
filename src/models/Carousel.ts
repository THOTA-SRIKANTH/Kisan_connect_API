import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Carousel document
interface ICarousel extends Document {
  image: string;
  title: string;
}

// Define the Carousel schema
const carouselSchema: Schema<ICarousel> = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Create the Carousel model
const Carousel = mongoose.model<ICarousel>('Carousel', carouselSchema);

export default Carousel;
