import express from "express";
import * as orderController from "../../controller/admin/order.controller.js";

const router = express.Router();

router.post('/create', orderController.orderControllerCreate);
export default router;