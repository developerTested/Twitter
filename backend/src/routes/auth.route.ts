import { Router } from "express"
import { doLogin, registerUser, signOut } from "../controllers/auth.controller";
import validateRequest from "../middlewares/validateRequest.middleware";
import { LoginSchema, RegisterSchema } from "../schema/authSchema";


const authRouter = Router();

authRouter.post("/login", validateRequest(LoginSchema), doLogin)

authRouter.post("/register",validateRequest(RegisterSchema), registerUser)

authRouter.post("/logout", signOut)

export default authRouter