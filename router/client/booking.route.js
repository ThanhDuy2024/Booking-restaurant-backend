import express from "express";
import { bookingController } from "../../controller/client/booking.controller.js";
const router = express.Router();

router.post("/create", bookingController);

export default router;