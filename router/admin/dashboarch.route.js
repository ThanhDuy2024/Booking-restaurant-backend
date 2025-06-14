import { Router } from "express";
import { orderStatusAllBranch } from "../../controller/admin/dashboard.controller.js";

const router = Router();

router.get('/orderAllBranch', orderStatusAllBranch)
export default router;