import express from "express";
import multer from "multer";
import { 
        categoryCreateController, 
        categoryEditController, 
        categoryDeleteController, 
        categoryListController 
      } from "../../controller/admin/category.controller.js";
import storage from "../../helpers/cloudinaryHelper.js";

const upload = multer({
  storage: storage
})

const router = express.Router();

router.post("/create", upload.single("avatar"), categoryCreateController);

router.patch('/edit/:id',upload.single("avatar"), categoryEditController);

router.delete('/delete/:id', categoryDeleteController);

router.get('/list', categoryListController);

export default router;