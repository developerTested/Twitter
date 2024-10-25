import { NextFunction, Request, Response } from "express";
import ApiError from "../utilities/ApiError";
import { AUTH_FAILED, AUTH_REQUIRED } from "../constants";
import User, { userType } from "../models/user";
import asyncHandler from "../utilities/asyncHandler";
import { verifyToken } from "../utilities/helper";

const authMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.accessToken || req.headers.authorization?.split("Bearer")[1].trim();

    if (!token) {
        throw new ApiError(401, AUTH_REQUIRED)
    }

    try {

        const decodeToken = verifyToken(token)

        if (!decodeToken) {
            throw new ApiError(401, AUTH_REQUIRED)
        }

        const user = await User.findById(decodeToken._id).select(["-password", "-refreshToken"])

        if (!user) {
            throw new ApiError(401, AUTH_FAILED);
        }

        req.currentUser = user;

        next();
    } catch (error) {
        next(error)
    }

});

export default authMiddleware