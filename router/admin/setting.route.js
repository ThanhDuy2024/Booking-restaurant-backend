import express from "express";
import { settingListController } from "../../controller/admin/setting.controller.js";
const router = express.Router();

router.get("/list", settingListController);

export default router;