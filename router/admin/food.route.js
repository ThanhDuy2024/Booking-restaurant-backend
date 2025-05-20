import express from "express";
import { foodCreateController } from "../../controller/admin/food.controller.js";

const router = express.Router();

router.post("/create", foodCreateController);

export default router;