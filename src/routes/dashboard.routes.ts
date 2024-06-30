import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin.middleware";
import { getDashboardDataController } from "../controllers/dashboard.controller";

const router = Router();

router.get("", isAdmin, getDashboardDataController);

export default router;