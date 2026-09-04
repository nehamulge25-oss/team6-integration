import express from "express";
import cors from "cors";
import metaRoutes from "./routes/meta.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { rateMiddleware } from "./middleware/rateLimit.middleware.js";
import tenantRoutes from "./routes/tenant.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Team 6 API is running",
  });
});

// Protected REST API
app.use(
  "/api/meta",
  authMiddleware,
  rateMiddleware,
  metaRoutes
);

app.use(
  "/api/tenants",
  authMiddleware,
  rateMiddleware,
  tenantRoutes
);

// Public Meta webhook
app.use("/", webhookRoutes);
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use(errorMiddleware);

export default app;