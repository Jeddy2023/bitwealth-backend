import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError.utils";

export const errorHandler = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        const statusCode = err.statusCode ?? 500;
        return res.status(statusCode).json({ message: err.message });
    }
    console.error(err);
    console.log(err)
    return res.status(500).json({ message: "Internal Server Error" });
};
