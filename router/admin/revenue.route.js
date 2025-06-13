import { Router } from "express";
import * as revenueController from "../../controller/admin/revenue.controller.js";

const router = Router();

router.get("/day", revenueController.revenueDay);

router.get("/month", revenueController.revenueMonth);

router.get("/years", revenueController.revenueYears);
export default router