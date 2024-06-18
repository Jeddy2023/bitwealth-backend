import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/database";
import cors from "cors";
dotenv.config();

dbConnect();
const app: express.Application = express();
app.use(express.json());
const corsOptions = {
    origin: '*', // Allow requests from all origins (adjust for production)
    credentials: true, // Allow cookies for CORS requests
    allowedHeaders: '*', // Allow all headers (adjust as needed)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all HTTP methods
};
app.use(cors(corsOptions));

export default app;