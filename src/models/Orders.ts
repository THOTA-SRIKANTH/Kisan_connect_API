import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for CartItem
interface CartItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
}

// Define the interface for OrderedItem
interface OrderedItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    orderedDate?: Date;
    amount: number;
}



// Define the interface for Orders
interface Orders extends Document {
    userId: mongoose.Types.ObjectId;
    cartItems: CartItem[];
    orderedItems: OrderedItem[];
    onTheWayItems: OrderedItem[];
    
}

// Create the Mongoose Schema
const OrdersSchema = new Schema<Orders>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItems: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    orderedItems: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        orderedDate: { type: Date, default: Date.now },
        amount: { type: Number, required: true }
    }],
    onTheWayItems: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        orderedDate: { type: Date, default: Date.now },
        amount: { type: Number, required: true }
    }]
});

// Export the model
const OrdersModel = mongoose.model<Orders>('Orders', OrdersSchema);
export default OrdersModel;
