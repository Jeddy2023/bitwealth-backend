"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: '*', // Allow requests from all origins (adjust for production)
    credentials: true, // Allow cookies for CORS requests
    allowedHeaders: '*', // Allow all headers (adjust as needed)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all HTTP methods
};
app.use((0, cors_1.default)(corsOptions));
exports.default = app;
