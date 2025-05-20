import express from "express";
import multer from "multer";
import storage from "../../helpers/cloudinaryHelper.js";
import { accountStaffCreateController } from "../../controller/admin/accountStaff.controller.js";

const upload = multer({
  storage: storage
})

const router = express.Router();

router.post('/create', upload.single("avatar"), accountStaffCreateController);

export default router
