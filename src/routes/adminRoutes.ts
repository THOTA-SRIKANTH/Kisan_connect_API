import express from "express"
import carouselRouter from "./carousel"
import farmerApplication from "./farmerApplicationRoutes"

const router=express.Router()

router.use("/carousel",carouselRouter)
router.use("/farmer",farmerApplication)

export default router