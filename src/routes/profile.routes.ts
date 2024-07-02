import { Router } from "express";
import { 
  getProfileController,
  editProfileController, 
  changePasswordController,
  getWalletDetailsController } from "../controllers/profile.controller";

const router = Router();

router.get("", getProfileController);
router.get("/wallet-details", getWalletDetailsController);
router.patch("/edit", editProfileController);
router.patch("/change-password", changePasswordController);

export default router;