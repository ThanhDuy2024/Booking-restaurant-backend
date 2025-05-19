import express from "express";
import { categoryCreateController } from "../../controller/admin/category.controller.js";
const router = express.Router();

router.post("/create", categoryCreateController);

export default router;