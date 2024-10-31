import { Router } from "express"
import { doLogin, refreshToken, registerUser, logoutUser } from "../controllers/auth.controller";
import validateRequest from "../middlewares/validateRequest.middleware";
import { LoginSchema, RegisterSchema } from "../schema/authSchema";
import { getCurrentUser } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/login", validateRequest(LoginSchema), doLogin)

authRouter.post("/register",validateRequest(RegisterSchema), registerUser)

authRouter.post("/logout", authMiddleware, logoutUser)

authRouter.get('/currentUser', authMiddleware, getCurrentUser);

authRouter.post('/refreshToken', refreshToken);

export default authRouter