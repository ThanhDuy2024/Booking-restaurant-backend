import express from "express";
import { bookingControllerList } from "../../controller/admin/booking.controller.js";
const router = express.Router();

router.get("/list", bookingControllerList);

export default router;