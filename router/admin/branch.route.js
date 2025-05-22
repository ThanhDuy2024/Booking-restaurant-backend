import express from "express";
import multer from "multer";
import { branchCreateController, branchEditController } from "../../controller/admin/branch.controller.js";
const router = express.Router();
import storage from "../../helpers/cloudinaryHelper.js";

const upload = multer({
  storage: storage
})

router.post('/create', upload.single("avatar"), branchCreateController);

router.post('/edit/:id', upload.single("avatar"), branchEditController);

export default router;