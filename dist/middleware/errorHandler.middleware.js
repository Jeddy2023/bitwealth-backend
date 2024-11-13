"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_utils_1 = require("../utils/customError.utils");
const errorHandler = (err, req, res, next) => {
    if (err instanceof customError_utils_1.CustomError) {
        const statusCode = err.statusCode ?? 500;
        return res.status(statusCode).json({ message: err.message });
    }
    console.error(err);
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
};
exports.errorHandler = errorHandler;
