import { Router } from 'express';
import { check } from 'express-validator';
import * as userController from '../controllers/userController';
import fetchUser from '../middlewares/fetchUser';

const userRouter = Router();

userRouter.post('/createUser', [
    check('name').isLength({ min: 3, max: 30 }).withMessage('Name should be between 3 and 20 characters'),
    check('password').isLength({ min: 8, max: 8 }).withMessage('Password must be 8 characters long'),
    check('email').isEmail().withMessage('Email is invalid')
], userController.createUser);

userRouter.post('/login', [
    check('password').isLength({ min: 8, max: 8 }).withMessage('Password must be 8 characters long'),
    check('email').isEmail().withMessage('Email is invalid')
], userController.login);

userRouter.get('/getUser',fetchUser, userController.getUser);

userRouter.post('/addCartItem',fetchUser,userController.addToCart)
userRouter.put('/updateCartItem',fetchUser,userController.updateCart)
userRouter.delete('/deleteCardItem/:productId',fetchUser,userController.deleteFromCart)
userRouter.get('/getAllcartItems',fetchUser,userController.getAllCartItems)


userRouter.post('/placeOrder',fetchUser,userController.placeOrder)

userRouter.get('/getAllDeliveryItems',fetchUser,userController.getAllDeliveryItems)
userRouter.post('/orderDelivered',fetchUser,userController.orderDelivered)


export default userRouter;
