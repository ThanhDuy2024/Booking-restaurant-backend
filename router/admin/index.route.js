import express from "express";
import authRouter from "./auth.route.js";
import categoryRouter from "./category.route.js";
import { authentication } from "../../middleware/auth.middleware.js";
const router = express.Router();

router.use("/auth", authRouter);

router.use('/category',authentication, categoryRouter);

export default router;