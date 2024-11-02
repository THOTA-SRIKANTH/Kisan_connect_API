import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import OrdersModel  from '../models/Orders';
import { validationResult } from 'express-validator';
import DeliveryItemsModel from '../models/DeliveryItemsModel'; // Adjust the import path
import Product from '../models/Product';



export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            res.status(400).json({ error: "Enter valid Details" });
            return;
        }
        const checking = await User.findOne({ email });
        if (checking) {
            res.status(400).json({ error: "Email already exists" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            address,
            phoneNumber,
            password: secPass
        });

         // Create an OrdersModel instance with empty fields and associate it with the user
         await OrdersModel.create({
            userId: user._id,
            cartItems: [],
            orderedItems: [],
            onTheWayItems: [],
            address: {
                doorNumber: '',
                phoneNumber: '',
                street: '',
                pincode: ''
            }
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            res.status(400).json("error at login");
            return;
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }

        const matches = await bcrypt.compare(password, user.password);
        if (!matches) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.roles.isAdmin,
            isFarmer: user.roles.isFarmer,
            isDeliveryBoy: user.roles.isDeliveryBoy
        }, 'Revanth');

        res.status(200).json({ token,user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUser=async(req:Request,res:Response)=>
{
    try{
        const user=await User.findById(req.user?.id).select('-password');
        res.status(200).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
      const userInDatabase = await User.findById(req.user?.id).select('-password');
      const { user } = req.body;
        console.log(user)
      // Ensure `userInDatabase` is found before attempting to update
      if (!userInDatabase) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      await User.findByIdAndUpdate(userInDatabase._id, user, { new: true });
      
      res.status(200).json({ msg: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };
  

export const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const {productId, quantity } = req.body;

        // Check for valid input
        if (!userId || !productId || !quantity) {
            res.status(400).json({ error: "userId, productId, and quantity are required" });
            return;
        }

        // Find the user's order
        let order = await OrdersModel.findOne({ userId });

        // If no order exists, create a new one
        if (!order) {
            order = await OrdersModel.create({
                userId,
                cartItems: [],
                orderedItems: [],
                onTheWayItems: []
            });
        }

        // Check if the product is already in the cart
        const existingItemIndex = order.cartItems.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex > -1) {
            // If the item exists, update the quantity
            order.cartItems[existingItemIndex].quantity += quantity;
        } else {
            // If the item doesn't exist, add a new item to the cart
            order.cartItems.push({ productId, quantity });
        }

        // Save the updated order
        await order.save();

        res.status(200).json({ message: 'Product added to cart successfully', cartItems: order.cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

export const updateCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id; // Get user ID from the JWT token
        const { productId, quantity } = req.body; // Get the productId and quantity from the request body

        // Check for valid input
        if (!userId || !productId || quantity === undefined) {
            res.status(400).json({ error: "userId, productId, and quantity are required" });
            return;
        }

        // Find the user's order
        const order = await OrdersModel.findOne({ userId });

        // If no order exists, return an error
        if (!order) {
            res.status(404).json({ error: "No order found for this user" });
            return;
        }

        // Find the index of the existing item in the cart
        const existingItemIndex = order.cartItems.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex > -1) {
            // Update the quantity of the existing item
            order.cartItems[existingItemIndex].quantity = quantity;
        } else {
            // If the item doesn't exist, you may want to add it or return an error
            res.status(404).json({ error: "Product not found in the cart" });
            return;
        }

        // Save the updated order
        await order.save();

        res.status(200).json({ message: 'Cart updated successfully', cartItems: order.cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

export const deleteFromCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id; // Get user ID from the JWT token
        const { productId } = req.params; // Get the productId from URL parameters

        // Check for valid input
        if (!userId || !productId) {
            res.status(400).json({ error: "userId and productId are required" });
            return;
        }

        // Find the user's order
        const order = await OrdersModel.findOne({ userId });

        // If no order exists, return an error
        if (!order) {
            res.status(404).json({ error: "No order found for this user" });
            return;
        }

        // Filter out the item with the specified productId
        order.cartItems = order.cartItems.filter(item => item.productId.toString() !== productId);

        // Save the updated order
        await order.save();

        res.status(200).json({ message: 'Product removed from cart successfully', cartItems: order.cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};


export const getAllCartItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id; // Get user ID from the JWT token

        // Check for valid input
        if (!userId) {
            res.status(400).json({ error: "userId is required" });
            return;
        }

        // Find the user's order
        const order = await OrdersModel.findOne({ userId });

        // If no order exists, return an empty cart
        if (!order || order.cartItems.length === 0) {
            res.status(200).json({ message: "Your cart is empty", cartItems: [] });
            return;
        }

        // Return the cart items
        res.status(200).json({ cartItems: order.cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};


export const placeOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id; // Get user ID from the request
        const { productId, quantity } = req.body; // Get productId and quantity from the request body

        // Check for valid input
        if (!userId || !productId || !quantity) {
            res.status(400).json({ error: "userId, productId, and quantity are required" });
            return;
        }

        // Verify if the user exists
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        // Get the user's address
        const address = user?.address;

        // Find the product to get its details
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        // Check if the requested quantity is available in stock
        if (quantity > product.stock) {
            res.status(400).json({ error: "Requested quantity exceeds available stock" });
            return;
        }

        // Calculate the amount based on product price and quantity
        const amount = product.price * quantity;

        // Check if the delivery item already exists
        const existingDeliveryItem = await DeliveryItemsModel.findOne({ userId, productId });
        let deliveryItem={}
        if (existingDeliveryItem) {
            // If the delivery item exists, update the quantity and amount
            existingDeliveryItem.quantity += quantity; // Update quantity
            existingDeliveryItem.amount += amount; // Update amount

            // Save the updated delivery item
            await existingDeliveryItem.save();
        } else {
            // If no existing delivery item, create a new one
             deliveryItem = {
                userId,
                productId,
                address,
                quantity,
                amount
            };

            // Save the delivery item to the DeliveryItemsModel
            await DeliveryItemsModel.create(deliveryItem);
        }

        // Find the user's existing order or create a new one
        let order = await OrdersModel.findOne({ userId });

        // If no order exists, create a new one
        if (!order) {
            order = await OrdersModel.create({
                userId,
                cartItems: [],
                orderedItems: [],
                onTheWayItems: []
            });
        }

        // Add the ordered item to the on-the-way items in the order
        order.onTheWayItems.push({
            productId,
            quantity,
            orderedDate: new Date(),
            amount // Use the calculated amount for the ordered item
        });

        // Save the updated order
        await order.save();

        // Optionally, decrease the stock of the product
        product.stock -= quantity;
        await product.save(); // Save the updated product stock

        res.status(200).json({ message: 'Order placed successfully', deliveryItem: existingDeliveryItem || deliveryItem });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};



export const getAllDeliveryItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id; // Get user ID from the request

        // Check if user is authenticated
        if (!userId) {
            res.status(401).json({ error: "User not authenticated" });
            return;
        }

        // Check if the user is a delivery boy
        if (req.user?.isDeliveryBoy) { // Assuming `isDeliveryBoy` is a field in the User model
            res.status(403).json({ error: "Access denied. You are not a delivery boy." });
            return;
        }

        // Fetch all delivery items without filtering by userId
        const deliveryItems = await DeliveryItemsModel.find();

        res.status(200).json(deliveryItems);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};



export const orderDelivered = async (req: Request, res: Response): Promise<void> => {
    try {
        const deliveryBoyId = req.user?.id; // Get the delivery boy's ID from the request
        const { userId, productId } = req.body; // Get the userId (customer) and productId from the request body

        
        // Check for valid input
        if (!deliveryBoyId || !userId || !productId) {
            res.status(400).json({ error: "deliveryBoyId, userId, and productId are required" });
            return;
        }

        
        if (req.user?.isDeliveryBoy) {
            res.status(403).json({ error: "Access denied. You are not a delivery boy." });
            return;
        }

        // Find the user's order
        const order = await OrdersModel.findOne({ userId });
        if (!order) {
            res.status(404).json({ error: "Order not found for the given user" });
            return;
        }

        // Find the index of the item in onTheWayItems
        const itemIndex = order.onTheWayItems.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            res.status(404).json({ error: "Item not found in on-the-way items" });
            return;
        }

        // Get the item details to be moved
        const deliveredItem = order.onTheWayItems[itemIndex];

        // Remove the item from onTheWayItems
        order.onTheWayItems.splice(itemIndex, 1);

        // Add the delivered item to orderedItems
        order.orderedItems.push({
            productId: deliveredItem.productId,
            quantity: deliveredItem.quantity,
            orderedDate: new Date(), // You can keep the original ordered date if you prefer
            amount: deliveredItem.amount
        });

        // Save the updated order
        await order.save();

        // Remove the delivery item from DeliveryItemsModel
        await DeliveryItemsModel.deleteOne({ userId, productId });

        res.status(200).json({ message: 'Order marked as delivered successfully', deliveredItem });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};
