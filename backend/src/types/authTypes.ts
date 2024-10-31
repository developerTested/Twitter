import { Request } from 'express';
import { ParamsDictionary } from "express-serve-static-core";

declare module 'express' {
    interface Request {
        currentUser?: UserType;
        files? : File[],
        file?: File,
    }
}

export type AuthRequest<B = ParamsDictionary, P = any, Q = any> = Request<B, P, Q>

export type UserType = {
    _id: string,
    display_name: string,
    user_name: string,
    gender?: "Male" | "Female",
    email: string,
    password: string,
    avatar?: string,
    coverImage?: string,
    bio?: string,
    refreshToken?: string
}

export type UserMethods = {
    isPasswordCorrect(password: string): Promise<Boolean>,
}