import { Request, Response } from "express";
import { AUTH_FAILED, AUTH_PASS_FAIL, AUTH_REQUIRED, USER_EXISTS } from "../constants";
import User from "../models/user";
import ApiError from "../utilities/ApiError";
import ApiResponse from "../utilities/ApiResponse";
import asyncHandler from "../utilities/asyncHandler";
import { registerBody } from "../schema/authSchema";
import { generateTokens, verifyRefreshToken, verifyToken } from "../utilities/helper";

const options = {
    httpOnly: true,
    secure: true,
}

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

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse({
                user,
                accessToken,
                refreshToken
            }, "You've logged in successfully!"))

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

/**
 * Logout user
 */
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    if (!req.currentUser || !req.currentUser._id) {
        return res.status(401).json(new ApiError(401, AUTH_REQUIRED));
    }

    const currentUser = req.currentUser?._id;

    await User.findByIdAndUpdate(currentUser,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res.status(200).
        clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new ApiResponse({}, "You've logged out successfully!"))
})

/**
 * Refresh access token using refreshToken
 */
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {

    const incomingToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingToken) {
        throw new ApiError(400, "Invalid refresh token")
    }

    const decodeToken = verifyRefreshToken(incomingToken);

    if (!decodeToken) {
        throw new ApiError(401, AUTH_REQUIRED)
    }

    const user = await User.findById(decodeToken._id);

    if (!user) {
        throw new ApiError(401, AUTH_FAILED)
    }

    if (incomingToken !== user.refreshToken) {
        throw new ApiError(401, "Token Mismatch")
    }

    const { accessToken, refreshToken } = await generateTokens(user._id)

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                {
                    accessToken,
                    refreshToken
                },
                "Access token refreshed"
            )
        );
})