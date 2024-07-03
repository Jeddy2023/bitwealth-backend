"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAdmin_middleware_1 = require("../middleware/isAdmin.middleware");
const transaction_controller_1 = require("../controllers/transaction.controller");
const multer_config_1 = require("../config/multer-config");
const router = (0, express_1.Router)();
router.post("/deposit", (req, res, next) => {
    multer_config_1.upload.single("proofOfPayment")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: "Validation Error", errors: err });
        }
        next();
    });
}, transaction_controller_1.createDepositController);
router.get("/list-deposits", isAdmin_middleware_1.isAdmin, transaction_controller_1.listDepositsController);
router.get("/list-users-deposits", transaction_controller_1.listUsersDepositsController);
exports.default = router;
