import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { DashboardService } from "../services/dashboard.service";
import DashboardServiceImpl from "../services/impl/dashboard.service.impl";
import { Request, Response } from "express";

const dashboardService: DashboardService = new DashboardServiceImpl();

export const getDashboardDataController = asyncHandler(async (req: Request, res: Response ) => {
  const data = await dashboardService.getDashboardData();
  res.status(200).json({ data });
});