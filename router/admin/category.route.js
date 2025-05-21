import express from "express";
import multer from "multer";
import { 
        categoryCreateController, 
        categoryEditController, 
        categoryDeleteController, 
        categoryListController 
      } from "../../controller/admin/category.controller.js";
import storage from "../../helpers/cloudinaryHelper.js";
import { categoryValidate } from "../../validate/category.validate.js";

const upload = multer({
  storage: storage
})

const router = express.Router();

router.post("/create", upload.single("avatar"), categoryValidate, categoryCreateController);

router.patch('/edit/:id', upload.single("avatar"), categoryValidate, categoryEditController);

router.delete('/delete/:id', categoryDeleteController);

router.get('/list', categoryListController);

export default router;