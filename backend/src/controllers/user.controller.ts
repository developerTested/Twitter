import { Request, Response } from "express";
import asyncHandler from "../utilities/asyncHandler";
import ApiError from "../utilities/ApiError";
import User from "../models/user";
import ApiResponse from "../utilities/ApiResponse";
import { AUTH_REQUIRED, USER_NOT_FOUND } from "../constants";

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {

    const currentUser = req.currentUser;

    if (!currentUser) {
        throw new ApiError(401, AUTH_REQUIRED);
    }

    const user = await User.findById(currentUser._id);

    if (!user) {
        throw new ApiError(401, USER_NOT_FOUND);
    }

    return res.json(new ApiResponse(user, "User profile fetched successfully!"));
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
    const { user_name } = req.params;

    if (!user_name) {
        throw new ApiError(404, USER_NOT_FOUND);
    }

    const user = await User.findOne({ user_name });

    if (!user) {
        throw new ApiError(404, USER_NOT_FOUND);
    }

    return res.json(new ApiResponse(user, "User profile fetched successfully!"));
});


export const updateProfile = asyncHandler(async (req: Request, res: Response) => {

});


export const uploadAvatar = asyncHandler(async (req: Request, res: Response) => {

});



export const uploadCover = asyncHandler(async (req: Request, res: Response) => {

});


