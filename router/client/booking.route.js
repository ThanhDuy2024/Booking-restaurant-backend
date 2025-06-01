import express from "express";
import { bookingController } from "../../controller/client/booking.controller.js";
import { bookingValidate } from "../../validate/booking.validate.js";
const router = express.Router();

router.post("/create", bookingValidate, bookingController);

export default router;