import express from "express";
import multer from "multer";
import storage from "../../helpers/cloudinaryHelper.js";
import { accountStaffCreateController, accountStaffDeleteController, accountStaffEditController, accountStaffListController } from "../../controller/admin/accountStaff.controller.js";
import { accountValidateCreateForm, accountValidateEditForm } from "../../validate/account.validate.js";

const upload = multer({
  storage: storage
})

const router = express.Router();

router.post('/create', upload.single("avatar"), accountValidateCreateForm, accountStaffCreateController);

router.patch('/edit/:id', upload.single("avatar"), accountValidateEditForm, accountStaffEditController);

router.get('/list', accountStaffListController);

router.delete('/delete/:id', accountStaffDeleteController);

export default router
