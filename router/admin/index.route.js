import express from "express";
import authRouter from "./auth.route.js";
import categoryRouter from "./category.route.js";
import foodRouter from "./food.route.js";
import accountStaffRouter from "./accountStaff.route.js";
import profileRouter from "./profile.route.js";
import branchRouter from "./branch.route.js";
import settingRouter from "./setting.route.js";
import bookingRouter from "./booking.route.js";
import { authentication  } from "../../middleware/auth.middleware.js";
const router = express.Router();

router.use("/auth", authRouter);

router.use('/category', authentication, categoryRouter);

router.use('/food', authentication, foodRouter);

router.use('/account-staff', authentication, accountStaffRouter);

router.use('/profile', authentication, profileRouter);

router.use('/branch', authentication, branchRouter);

router.use('/setting', authentication, settingRouter);

router.use('/booking', authentication, bookingRouter);
export default router;