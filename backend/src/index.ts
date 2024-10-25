import { app, PORT } from "./api";

/**
 * Express Server
 */
app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT} in ${app.settings.env} mode`);
});