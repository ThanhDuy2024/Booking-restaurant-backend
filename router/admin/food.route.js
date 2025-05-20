import express from "express";
import multer from "multer";
import { foodCreateController, foodEditController, foodDeleteController, foodListController } from "../../controller/admin/food.controller.js";
import { foodValidate } from "../../validate/food.validate.js";

import storage from "../../helpers/cloudinaryHelper.js";

const upload = multer({
  storage: storage
})
const router = express.Router();

router.post("/create", upload.single("avatar"), foodValidate, foodCreateController);

router.patch('/edit/:id', upload.single("avatar"), foodValidate, foodEditController);

router.delete('/delete/:id', foodDeleteController);

router.get('/list', foodListController);

export default router;