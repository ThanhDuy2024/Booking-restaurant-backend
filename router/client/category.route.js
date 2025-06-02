import express from "express";
import { categoryControllerList } from "../../controller/client/category.controller.js";

const router = express.Router();

router.get('/list', categoryControllerList);

export default router