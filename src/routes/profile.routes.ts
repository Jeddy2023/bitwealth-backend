import { Router } from "express";
import { 
  getProfileController,
  editProfileController, 
  changePasswordController } from "../controllers/profile.controller";

const router = Router();

router.get("", getProfileController);
router.patch("/edit", editProfileController);
router.patch("/change-password", changePasswordController);

export default router;