import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin.middleware";
import { createDepositController, listDepositsController, listUsersDepositsController } from "../controllers/transaction.controller";
import { upload } from "../config/multer-config";

const router = Router();

router.post("/deposit", (req, res, next) => {
  upload.single("proofOfPayment")(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ message: "Validation Error", errors: err });
    }
    next();
  });
}, createDepositController)

router.get("/list-deposits", isAdmin, listDepositsController)

router.get("/list-users-deposits", listUsersDepositsController)

export default router;