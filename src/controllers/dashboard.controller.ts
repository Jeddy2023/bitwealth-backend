import { SendEmailDto } from "../dto/email.dto";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
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