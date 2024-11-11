import express from "express"
import carouselRouter from "./carousel"
import farmerApplication from "./farmerApplicationRoutes"
import adminController from "../controllers/adminController"
import deliveryBoyController from "../controllers/deliveryBoyController"

const router=express.Router()

router.use("/carousel",carouselRouter)
router.use("/farmer",farmerApplication)
router.use("/details",adminController)
router.use("/deliveryBoy",deliveryBoyController)
export default router