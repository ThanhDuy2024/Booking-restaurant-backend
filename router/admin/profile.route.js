import express from "express";
import { profileGetController } from "../../controller/admin/profile.controller.js";
const router = express.Router();

router.get('/me', profileGetController);

export default router