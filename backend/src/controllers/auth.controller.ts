import { Request, Response } from "express";
import { AUTH_FAILED, AUTH_PASS_FAIL, USER_EXISTS } from "../constants";
import User from "../models/user";
import ApiError from "../utilities/ApiError";
import ApiResponse from "../utilities/ApiResponse";
import asyncHandler from "../utilities/asyncHandler";
import { registerBody } from "../schema/authSchema";
import { generateTokens } from "../utilities/helper";


export const doLogin = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;

    // Get user by email
    const user = await User.findOne({
        email
    });

    if (!user) {
        throw new ApiError(401, AUTH_FAILED);
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, AUTH_PASS_FAIL);
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    return res.json(new ApiResponse({
        user,
        accessToken,
        refreshToken,
    }, "You've logged in Successfully!"));

})

export const registerUser = asyncHandler(async (req: Request<{}, {}, registerBody>, res: Response) => {

    const { email, password, user_name, display_name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, USER_EXISTS)
    }

    const user = await User.create({
        email,
        password,
        user_name,
        display_name,
    });

    if (!user) {
        throw new ApiError(500, "Unable to register your account.")
    }

    return res.status(201).json(new ApiResponse(user, "Your account has been registered successfully"))
})

export const signOut = asyncHandler(async (req: Request, res: Response) => {

})