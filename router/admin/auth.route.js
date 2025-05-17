import express from "express";
import {loginController, registerController, logoutController} from "../../controller/admin/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("ok");
})

router.post("/login", loginController);

router.post("/register", registerController);

router.delete("/logout", logoutController);

export default router;