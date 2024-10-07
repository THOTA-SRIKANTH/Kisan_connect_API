import express from "express"
import productRouter from "./productRoutes"
const farmerRouter=express.Router()

farmerRouter.use("/product",productRouter)

export default farmerRouter