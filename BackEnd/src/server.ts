import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";
import { verifyMailConnection } from "./config/mail";

const startServer = async () => {
    try {
        await connectDB();

        await verifyMailConnection();

        app.listen(env.PORT, () => {
            console.log(`🚀 Server running on port ${env.PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server");

        if (error instanceof Error) {
            console.error(error.message);
        }

        process.exit(1);
    }
};

startServer();