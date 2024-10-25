import express, { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import ApiError from "./utilities/ApiError"
import authRouter from "./routes/auth.route"
import connectDB from "./db"

/**
 * Load .env file
 */
dotenv.config()

export const PORT = process.env.PORT || 3001
const ORIGIN_HOSTS = process.env.ORIGIN_HOSTS || "*"

/**
 * Express initialize
 */
export const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
    origin: ORIGIN_HOSTS,
    credentials: true,
    optionsSuccessStatus: 200,
}));

/**
 * Connect to DB
 */
connectDB()

/**
 * Routes
 */
const createVersionRoute = (route: string, version = 'v1') => "/api/" + version + "/" + route;

app.get('/', (req: Request, res: Response) => {
    return res.send('Express Server with Typescript support')
})

app.get('/ping', (req: Request, res: Response) => {
    return res.send('pong 🏓')
})


app.use(createVersionRoute("auth"), authRouter)

/**
 * Error Handing
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
   
    if (err?.statusCode) {
        return res.status(err.statusCode || 500).json(err);
    }

    return res.status(err.statusCode || 500).json(new ApiError(err.statusCode || 500, "An error occurred", err.message))
})

/**
 * 404 errors
 */
app.use("*", (req: Request, res: Response) => {
    return res.status(404).json(new ApiError(404, "Page not found"))
})