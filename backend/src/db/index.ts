import mongoose from "mongoose";
import { DB_NAME } from "../constants";
import { appConfig } from "../utilities/helper";

const uri = appConfig.MONGODB_URL;

/**
 * Connect to MongoDB
 */
export default async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${uri}/${DB_NAME}`);
        if (connectionInstance?.connection?.db) {
            await connectionInstance.connection.db.admin().command({ ping: 1 });
            console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        }

    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}