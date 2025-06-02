import express from "express";
import bookingRouter from "./booking.route.js";
import categoryRouter from "./category.route.js";
const router = express.Router();

router.use("/booking", bookingRouter);
router.use("/category", categoryRouter);
export default router