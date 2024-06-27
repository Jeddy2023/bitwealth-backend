import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin.middleware";
import { 
  listAllUsersController,
  getUserByIdController,
  editUserController,
  deleteUserController } from "../controllers/user.controller";

const router = Router();

router.get("", isAdmin, listAllUsersController);
router.get("/:userId", isAdmin, getUserByIdController);
router.patch("/:userId", isAdmin, editUserController);
router.delete("/:userId", isAdmin, deleteUserController)

export default router;
