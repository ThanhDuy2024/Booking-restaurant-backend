import express from "express";
import multer from "multer";
import { foodCreateController, foodEditController, foodDeleteController } from "../../controller/admin/food.controller.js";

import storage from "../../helpers/cloudinaryHelper.js";

const upload = multer({
  storage: storage
})
const router = express.Router();

router.post("/create", upload.single("avatar"), foodCreateController);

router.patch('/edit/:id', upload.single("avatar"), foodEditController);

router.delete('/delete/:id', foodDeleteController);

export default router;