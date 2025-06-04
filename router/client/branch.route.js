import express from 'express';
import { branchListController } from '../../controller/client/branch.controller.js';

const router = express.Router();
 router.get('/list', branchListController);
export default router;