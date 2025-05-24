import express from "express";
import multer from "multer";
import { branchCreateController, branchEditController, branchListController, branchDeleteController } from "../../controller/admin/branch.controller.js";
import { branchValidate } from "../../validate/branch.validate.js";
const router = express.Router();
import storage from "../../helpers/cloudinaryHelper.js";

const upload = multer({
  storage: storage
})

router.post('/create', upload.single("avatar"), branchValidate, branchCreateController);

router.patch('/edit/:id', upload.single("avatar"), branchValidate, branchEditController);

router.get('/list', branchListController);

router.delete("/delete/:id", branchDeleteController);

export default router;