import express from "express";
import {loginController, registerController} from "../../controller/admin/auth.controller.js";

const router = express.Router();

router.get("/login", loginController);

router.post("/register", registerController);

export default router;