import express from "express";
import * as orderController from "../../controller/admin/order.controller.js";
import * as orderValidate from "../../validate/order.validate.js";
const router = express.Router();

router.post('/create', orderValidate.orderCreateValidate, orderController.orderControllerCreate);

router.get('/list', orderController.orderControllerList);
export default router;