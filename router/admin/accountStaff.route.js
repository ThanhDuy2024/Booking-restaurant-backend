import express from "express";
import multer from "multer";
import storage from "../../helpers/cloudinaryHelper.js";
import { accountStaffCreateController, accountStaffEditController, accountStaffListController } from "../../controller/admin/accountStaff.controller.js";

const upload = multer({
  storage: storage
})

const router = express.Router();

router.post('/create', upload.single("avatar"), accountStaffCreateController);

router.patch('/edit/:id', upload.single("avatar"), accountStaffEditController);

router.get('/list', accountStaffListController);

export default router
