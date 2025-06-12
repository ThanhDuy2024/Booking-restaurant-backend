import { Router } from "express";
import * as revenueController from "../../controller/admin/revenue.controller.js";

const router = Router();

router.post("/list", revenueController.revenueAllBranch);

export default router