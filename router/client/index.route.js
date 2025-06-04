import express from "express";
import bookingRouter from "./booking.route.js";
import categoryRouter from "./category.route.js";
import foodRouter from "./food.route.js";
import branchRouter from "./branch.route.js";
const router = express.Router();
router.use("/branch", branchRouter);
router.use("/booking", bookingRouter);
router.use("/category", categoryRouter);
router.use("/food", foodRouter);
export default router