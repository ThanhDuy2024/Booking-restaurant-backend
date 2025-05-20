import express from "express";
import authRouter from "./auth.route.js";
import categoryRouter from "./category.route.js";
import foodRouter from "./food.route.js";
import { authentication } from "../../middleware/auth.middleware.js";
const router = express.Router();

router.use("/auth", authRouter);

router.use('/category',authentication, categoryRouter);

router.use('/food', authentication, foodRouter);

export default router;