import express from "express";
import multer from "multer";
import { profileGetController, profileEditController } from "../../controller/admin/profile.controller.js";
import storage from "../../helpers/cloudinaryHelper.js";

const upload = multer({
  storage: storage
})

const router = express.Router();

router.get('/me', profileGetController);

router.post('/me', upload.single("avatar"), profileEditController);

export default router;