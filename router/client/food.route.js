import express from "express";
import { foodControllerList } from "../../controller/client/food.controller.js";
const router = express.Router();

router.get('/list', foodControllerList);

export default router;