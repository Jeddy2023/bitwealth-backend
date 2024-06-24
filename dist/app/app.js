"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const profile_routes_1 = __importDefault(require("../routes/profile.routes"));
const isLoggedIn_middleware_1 = require("../middleware/isLoggedIn.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: '*', // Allow requests from all origins (adjust for production)
    credentials: true, // Allow cookies for CORS requests
    allowedHeaders: '*', // Allow all headers (adjust as needed)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all HTTP methods
};
try {
    mongoose_1.default.connect(process.env.MONGODB_CONNECTION)
        .then(() => {
        console.log("connected to database");
    });
}
catch (error) {
    process.exit(1);
}
app.use((0, cors_1.default)(corsOptions));
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/profile", isLoggedIn_middleware_1.isLoggedIn, profile_routes_1.default);
app.use((error, req, res, next) => {
    console.log(error.message);
    return res.status(error.statusCode).json({ message: error.message });
});
app.use((req, res) => {
    return res.status(404).json({ message: "Oops, not found" });
});
exports.default = app;
