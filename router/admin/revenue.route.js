import { Router } from "express";
import * as revenueController from "../../controller/admin/revenue.controller.js";

const router = Router();

router.get("/day", revenueController.revenueDay);

router.get("/month", revenueController.revenueMonth);

router.get("/years", revenueController.revenueYears);

router.get("/branch/day", revenueController.revenueBranchDay);

router.get("/branch/month", revenueController.revenueBranchMonth);

router.get("/branch/years", revenueController.revenueBranchYears);

export default router