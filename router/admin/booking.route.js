import express from "express";
import { bookingControllerList, bookingControllerDetail} from "../../controller/admin/booking.controller.js";
const router = express.Router();

router.get("/list", bookingControllerList);

router.post('/detail/:id', bookingControllerDetail);
export default router;