import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin.middleware";
import { listAllUsersController } from "../controllers/user.controller";

const router = Router();

router.get("", isAdmin, listAllUsersController);

export default router;
