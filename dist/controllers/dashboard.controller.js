"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardDataController = void 0;
const asyncHandler_middleware_1 = require("../middleware/asyncHandler.middleware");
const dashboard_service_impl_1 = __importDefault(require("../services/impl/dashboard.service.impl"));
const dashboardService = new dashboard_service_impl_1.default();
exports.getDashboardDataController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const data = await dashboardService.getDashboardData();
    res.status(200).json({ data });
});
