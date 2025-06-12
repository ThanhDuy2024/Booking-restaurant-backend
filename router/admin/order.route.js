import express from "express";
import * as orderController from "../../controller/admin/order.controller.js";
import * as orderValidate from "../../validate/order.validate.js";
const router = express.Router();

router.post('/create', orderValidate.orderValidate, orderController.orderControllerCreate);

router.get('/list', orderController.orderControllerList);

router.patch('/edit/:id', orderValidate.orderValidate, orderController.orderControllerEdit);

router.delete('/delete/:id', orderController.orderControllerDelete);
export default router;