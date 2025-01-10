import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin.middleware";
import {
  listAllUsersController,
  getUserByIdController,
  editUserController,
  deleteUserController,
  addRecoveryPhraseController,
  getAllWalletAddressesController,
  getUserErrorMessageController
} from "../controllers/user.controller";

const router = Router();

router.get("", isAdmin, listAllUsersController);
router.get("/:userId", isAdmin, getUserByIdController);
router.patch("/:userId", isAdmin, editUserController);
router.delete("/:userId", isAdmin, deleteUserController);
router.post("/recovery-phrase", addRecoveryPhraseController);
router.get("/application/wallet-addresses", getAllWalletAddressesController);
router.get("/application/error-message", getUserErrorMessageController);

export default router;
