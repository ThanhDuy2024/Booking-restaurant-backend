import express from "express";
import { bookingControllerList, bookingControllerDetail, bookingControllerDelete} from "../../controller/admin/booking.controller.js";
const router = express.Router();

router.get("/list", bookingControllerList);

router.post('/detail/:id', bookingControllerDetail);

router.delete('/delete/:id', bookingControllerDelete);
export default router;