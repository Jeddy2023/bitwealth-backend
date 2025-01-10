import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin.middleware";
import { getDashboardDataController, sendEmailController, updateWalletDetailsController } from "../controllers/dashboard.controller";

const router = Router();

router.get("", isAdmin, getDashboardDataController);
router.post("/send-email", isAdmin, sendEmailController);
router.patch("/wallet-details", isAdmin, updateWalletDetailsController);

export default router;