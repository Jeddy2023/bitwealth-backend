import { SendEmailDto } from "../dto/email.dto";
import { WalletDetails } from "../dto/walletdetails.dto";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { CustomRequest } from "../middleware/isLoggedIn.middleware";
import { DashboardService } from "../services/dashboard.service";
import DashboardServiceImpl from "../services/impl/dashboard.service.impl";
import { Request, Response } from "express";

const dashboardService: DashboardService = new DashboardServiceImpl();

export const getDashboardDataController = asyncHandler(async (req: Request, res: Response ) => {
  const data = await dashboardService.getDashboardData();
  res.status(200).json({ data });
});

export const sendEmailController = asyncHandler(async (req: Request, res: Response) => {
  const { email, subject, message }: SendEmailDto = req.body;

  if (!email || !subject || !message ) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  await dashboardService.sendEmail({ email, subject, message });

  res.status(200).json({ message: "Email sent successfully" });
});

export const updateWalletDetailsController = async (req: CustomRequest, res: Response) => {
  const walletDetails: WalletDetails = req.body;

  try {
      await dashboardService.updateWalletDetails(walletDetails);
      res.status(200).json({ message: "Wallet details updated successfully" });
  } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
  }
};