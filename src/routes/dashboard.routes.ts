import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin.middleware";
import { getDashboardDataController, sendEmailController } from "../controllers/dashboard.controller";

const router = Router();

router.get("", isAdmin, getDashboardDataController);
router.post("/send-email", isAdmin, sendEmailController);

export default router;