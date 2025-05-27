import express from "express";
import bookingRouter from "./booking.route.js";

const router = express.Router();

router.use("/booking", bookingRouter);

export default router