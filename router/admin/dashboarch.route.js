import { Router } from "express";
import { orderStatusAllBranch, orderStatusBranch, orderPriceAllBranch, orderPriceBranch} from "../../controller/admin/dashboard.controller.js";

const router = Router();

router.get('/order/status/all/branch', orderStatusAllBranch);

router.get('/order/status/branch', orderStatusBranch);

router.get('/total/price/all/branch', orderPriceAllBranch);

router.get('/total/price/branch', orderPriceBranch);
export default router;