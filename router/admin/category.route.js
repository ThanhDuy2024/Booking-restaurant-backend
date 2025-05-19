import express from "express";
import multer from "multer";
import { categoryCreateController } from "../../controller/admin/category.controller.js";
import storage from "../../helpers/cloudinaryHelper.js";

const upload = multer({
  storage: storage
})


const router = express.Router();

router.post("/create", upload.single("avatar"), categoryCreateController);

export default router;