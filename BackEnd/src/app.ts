import cors from "cors";
import express from "express";

import apiRoutes from "./routes";
import { errorMiddleware } from "./common/middlewares/error.middleware";
import { env } from "./config/env";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api", apiRoutes);
app.use(errorMiddleware);

export default app;
