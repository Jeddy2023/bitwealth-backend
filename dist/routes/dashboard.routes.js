"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAdmin_middleware_1 = require("../middleware/isAdmin.middleware");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const router = (0, express_1.Router)();
router.get("", isAdmin_middleware_1.isAdmin, dashboard_controller_1.getDashboardDataController);
exports.default = router;
