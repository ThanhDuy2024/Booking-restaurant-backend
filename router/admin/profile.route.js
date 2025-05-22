import express from "express";
import multer from "multer";
import { profileGetController, profileEditController } from "../../controller/admin/profile.controller.js";
import { accountValidateEditForm } from "../../validate/account.validate.js";
import storage from "../../helpers/cloudinaryHelper.js";

const upload = multer({
  storage: storage
})

const router = express.Router();

router.get('/me', profileGetController);

router.patch('/me', upload.single("avatar"), accountValidateEditForm, profileEditController);

export default router;