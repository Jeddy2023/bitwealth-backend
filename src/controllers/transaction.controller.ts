import { TransactionService } from "../services/transaction.service";
import TransactionServiceImpl from "../services/impl/transaction.service.impl";
import { CreateDepositDto } from "../dto/createDeposit.dto";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { Response } from "express";
import { CustomRequest } from "../middleware/isLoggedIn.middleware";
import { validator } from "../utils/validator.utils";
import { CustomRequestWithFile } from "../utils/customRequestWithFile.util";

const transactionService: TransactionService = new TransactionServiceImpl();

export const createDepositController = asyncHandler(async (req: CustomRequestWithFile, res: Response) => {
  const userId = req.user as string;
  // Check if proof Of Payment is present
  if (!req.file) return res.status(400).json({ message: "Validation Error", errors: [ "Proof of payment is required as PNG, JPG or JPEG!" ],});
  const createDepositDto = new CreateDepositDto(req.body.amount, req.body.paymentMethod, req.file.path);
  const errors = validator(CreateDepositDto, createDepositDto);
  if (errors) return res.status(400).json({ message: "Validation Error", errors });
  await transactionService.deposit(userId, createDepositDto);
  return res.status(201).json({ message: "Deposit created successfully" });
});

export const listDepositsController = asyncHandler(async (req: CustomRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const deposits = await transactionService.listDeposits(page, pageSize);
  return res.status(200).json({ deposits });
});